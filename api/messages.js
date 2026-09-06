const getRequiredEnv = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const getClientIp = (request) => {
  const forwarded = request.headers['x-forwarded-for']
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : ''
}

const isSameOrigin = (request) => {
  const origin = request.headers.origin
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.host
  } catch {
    return false
  }
}

const makeGasUrl = (scriptUrl, token) => {
  const url = new URL(scriptUrl)
  url.searchParams.set('token', token)
  return url
}

const parseBody = (body) => {
  if (!body) return {}
  if (typeof body === 'string') return Object.fromEntries(new URLSearchParams(body))
  return body
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (!['GET', 'POST'].includes(request.method)) {
    response.setHeader('Allow', 'GET, POST')
    return response.status(405).json({ status: 'error', message: 'Method Not Allowed' })
  }
  if (!isSameOrigin(request)) {
    return response.status(403).json({ status: 'error', message: 'Forbidden origin' })
  }

  try {
    const scriptUrl = getRequiredEnv('GOOGLE_APPS_SCRIPT_URL')
    const token = getRequiredEnv('GAS_API_TOKEN')
    const gasUrl = makeGasUrl(scriptUrl, token)
    const options = { redirect: 'follow' }

    if (request.method === 'POST') {
      const form = new URLSearchParams()
      const body = parseBody(request.body)
      for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string') form.set(key, value)
      }
      form.set('clientIp', getClientIp(request))
      options.method = 'POST'
      options.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
      options.body = form.toString()
    }

    const upstream = await fetch(gasUrl, options)
    const text = await upstream.text()
    let payload
    try {
      payload = JSON.parse(text)
    } catch {
      throw new Error('GAS returned an invalid response')
    }
    return response.status(upstream.ok ? 200 : upstream.status).json(payload)
  } catch (error) {
    console.error('Messages API proxy failed:', error)
    return response.status(502).json({ status: 'error', message: '服務暫時無法使用，請稍後再試。' })
  }
}
