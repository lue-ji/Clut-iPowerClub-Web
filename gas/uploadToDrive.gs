const DRIVE_FOLDER_ID = '1fDvy1B0EMs5UdIX1pn2zpjwd6azMF2v7'
const API_TOKEN_PROPERTY = 'API_TOKEN'
const MAX_IMAGE_DATA_URL_LENGTH = 7 * 1024 * 1024
const POST_RATE_LIMIT_SECONDS = 60

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
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

  return file.getUrl()
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

    sheet.appendRow([
      new Date(),
      name,
      department,
      contact,
      fileUrl,
      text
    ])

    return jsonResponse({ status: 'success', fileUrl })
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}

function doGet(e) {
  try {
    if (!isAuthorized(e)) return unauthorizedResponse()

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = sheet.getDataRange().getValues()

    const result = data.slice(1).reverse().map((row) => ({
      time: row[0],
      name: row[1],
      department: row[2],
      image: row[4] || '',
      text: row[5] || ''
    }))

    return jsonResponse(result)
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}
