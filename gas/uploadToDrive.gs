const DRIVE_FOLDER_ID = '1fDvy1B0EMs5UdIX1pn2zpjwd6azMF2v7'
const API_TOKEN_PROPERTY = 'API_TOKEN'
const MAX_IMAGE_DATA_URL_LENGTH = 7 * 1024 * 1024
const POST_RATE_LIMIT_SECONDS = 60

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function parsePostData(e) {
  let data = {}
  if (e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents)
    } catch (err) {
      // 若不是 JSON，保留 e.parameter 供 fallback
    }
  }

  if (!data || Object.keys(data).length === 0) {
    data = e.parameter || {}
  }

  return data
}

function getApiToken() {
  return PropertiesService.getScriptProperties().getProperty(API_TOKEN_PROPERTY)
}

function isAuthorized(e) {
  const expectedToken = getApiToken()
  const providedToken = e && e.parameter ? e.parameter.token : ''
  return Boolean(expectedToken) && providedToken === expectedToken
}

function unauthorizedResponse() {
  return jsonResponse({ status: 'error', message: 'Unauthorized' })
}

function getString(data, key, maxLength) {
  const value = String(data[key] || '').trim()
  if (value.length > maxLength) {
    throw new Error(`${key} 過長`)
  }
  return value
}

function createDriveImageFile(dataUrl, fileName) {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/)
  if (!match) {
    throw new Error('無效的圖片資料格式')
  }

  const contentType = match[1]
  const base64Data = match[2]
  const bytes = Utilities.base64Decode(base64Data)
  const blob = Utilities.newBlob(bytes, contentType, fileName)
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
  const file = folder.createFile(blob)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

  return `https://drive.google.com/uc?export=view&id=${file.getId()}`
}

function authorizeDriveAccess() {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
  const testFile = folder.createFile(
    'GAS Drive authorization test',
    'This file is created and trashed to verify Drive write access.',
  )
  testFile.setTrashed(true)
  Logger.log(`Drive write access granted: ${folder.getName()}`)
}

function makeExistingDriveImagesPublic() {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
  const files = folder.getFiles()
  let count = 0

  while (files.hasNext()) {
    const file = files.next()
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    count += 1
  }

  Logger.log(`Updated ${count} Drive files for public image access.`)
}

function migrateLegacyImages() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const rows = sheet.getDataRange().getValues()
  let migrated = 0
  let failed = 0

  rows.slice(1).forEach((row, index) => {
    const image = String(row[4] || '')
    if (!image.startsWith('data:image/')) return

    try {
      const name = String(row[1] || 'member')
        .trim()
        .replace(/[\\/:*?"<>|]/g, '_')
      const fileUrl = createDriveImageFile(image, `legacy_${name}_${index + 2}.jpg`)
      sheet.getRange(index + 2, 5).setValue(fileUrl)
      migrated += 1
    } catch (err) {
      failed += 1
      Logger.log(`Failed to migrate row ${index + 2}: ${err.message}`)
    }
  })

  Logger.log(`Migrated ${migrated} legacy images; failed ${failed}.`)
}

function toDriveImageUrl(value) {
  const imageUrl = String(value || '')
  const idMatch = imageUrl.match(/(?:[?&]id=|\/d\/)([A-Za-z0-9_-]+)/)
  if (!idMatch) return imageUrl
  return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`
}

function toImageDataUrl(value) {
  const imageUrl = String(value || '')
  if (imageUrl.startsWith('data:image/')) return imageUrl

  const idMatch = imageUrl.match(/(?:[?&]id=|\/d\/)([A-Za-z0-9_-]+)/)
  if (!idMatch) return imageUrl

  try {
    const file = DriveApp.getFileById(idMatch[1])
    const blob = file.getBlob()
    return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`
  } catch (err) {
    Logger.log(`Failed to read Drive image ${idMatch[1]}: ${err.message}`)
    return ''
  }
}

function getDriveImageDataUrl(fileId) {
  const file = DriveApp.getFileById(fileId)
  const blob = file.getBlob()
  return `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`
}

function doPost(e) {
  try {
    if (!isAuthorized(e)) return unauthorizedResponse()

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const cache = CacheService.getScriptCache()
    const data = parsePostData(e)

    const clientIp = getString(data, 'clientIp', 100) || 'unknown'
    const userKey = `post_${clientIp}`
    if (cache.get(userKey)) {
      return jsonResponse({ status: 'error', message: '發送速度過快' })
    }
    cache.put(userKey, '1', POST_RATE_LIMIT_SECONDS)

    const name = getString(data, 'name', 15)
    const department = getString(data, 'department', 100)
    const contact = getString(data, 'contact', 100)
    const text = getString(data, 'text', 60)
    if (!name || !contact) {
      return jsonResponse({ status: 'error', message: '缺少必要欄位' })
    }

    let fileUrl = ''
    if (data.image) {
      if (String(data.image).length > MAX_IMAGE_DATA_URL_LENGTH) {
        return jsonResponse({ status: 'error', message: '圖片檔案過大' })
      }
      try {
        const fileName = getString(data, 'imageName', 120) || `photo_${Date.now()}.jpg`
        fileUrl = createDriveImageFile(data.image, fileName)
      } catch (err) {
        return jsonResponse({ status: 'error', message: '圖片上傳失敗：' + err.message })
      }
    }

    sheet.appendRow([new Date(), name, department, contact, fileUrl, text])

    return jsonResponse({ status: 'success', fileUrl })
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}

function doGet(e) {
  try {
    if (!isAuthorized(e)) return unauthorizedResponse()

    if (e.parameter && e.parameter.imageId) {
      return jsonResponse({
        status: 'success',
        image: getDriveImageDataUrl(e.parameter.imageId),
      })
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = sheet.getDataRange().getValues()

    const result = data
      .slice(1)
      .reverse()
      .map((row) => ({
        time: row[0],
        name: row[1],
        department: row[2],
        image: row[4] || '',
        text: row[5] || '',
      }))

    return jsonResponse(result)
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}
