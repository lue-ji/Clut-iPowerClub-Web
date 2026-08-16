const SECRET = 'ipower20160802'
const DRIVE_FOLDER_ID = '1fDvy1B0EMs5UdIX1pn2zpjwd6azMF2v7'

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

function createDriveImageFile(dataUrl, fileName) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/)
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
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const cache = CacheService.getScriptCache()
    const data = parsePostData(e)

    const userKey = (data.contact || 'guest') + '_' + Math.floor(Date.now() / 10000)
    if (cache.get(userKey)) {
      return jsonResponse({ status: 'error', message: '發送速度過快' })
    }
    cache.put(userKey, '1', 4)

    if (data.token !== SECRET) {
      return jsonResponse({ status: 'error', message: 'Unauthorized' })
    }

    if (!data.name || !data.contact) {
      return jsonResponse({ status: 'error', message: '缺少必要欄位' })
    }

    if (data.name.length > 15 || (data.text && data.text.length > 60)) {
      return jsonResponse({ status: 'error', message: '稱呼或內容過長' })
    }

    let fileUrl = ''
    if (data.image) {
      try {
        const fileName = data.imageName || `photo_${Date.now()}.jpg`
        fileUrl = createDriveImageFile(data.image, fileName)
      } catch (err) {
        return jsonResponse({ status: 'error', message: '圖片上傳失敗：' + err.message })
      }
    }

    sheet.appendRow([
      new Date(),
      data.name,
      data.department || '',
      data.contact,
      fileUrl,
      data.text || ''
    ])

    return jsonResponse({ status: 'success', fileUrl })
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}

function doGet() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = sheet.getDataRange().getValues()

    const result = data.slice(1).reverse().map((row) => ({
      time: row[0],
      name: row[1],
      department: row[2],
      contact: row[3],
      image: row[4] || '',
      text: row[5] || ''
    }))

    return jsonResponse(result)
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message })
  }
}
