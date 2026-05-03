import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT) || 8080
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER
const FROM_NAME = process.env.FROM_NAME || 'Henna By Rachana - Website'

if (!SMTP_USER || !SMTP_PASS) {
  console.error('[startup] WARNING: SMTP_USER or SMTP_PASS not set. /api/contact will fail until configured.')
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
})

const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this address. Please try again in a few minutes.' }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message, website, consent_given_at } = req.body || {}

    if (website) {
      return res.status(200).json({ ok: true })
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }
    const n = name.trim()
    const m = message.trim()
    const e = email.trim()
    if (!n || !e || !m) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }
    if (n.length > 200 || e.length > 200 || m.length > 5000) {
      return res.status(400).json({ error: 'One of your fields is too long.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }

    const text =
      `New booking enquiry from hennabyrachana.com\n\n` +
      `Name: ${n}\n` +
      `Email: ${e}\n\n` +
      `Message:\n${m}\n\n` +
      `---\n` +
      `Consent given at: ${consent_given_at || 'unknown'}\n` +
      `Received at: ${new Date().toISOString()}\n` +
      `IP: ${req.ip || 'unknown'}\n`

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${n}" <${e}>`,
      subject: `Booking enquiry - ${n}`,
      text
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed:', err)
    res.status(500).json({ error: 'Sorry, the message could not be sent right now. Please try again later.' })
  }
})

const distPath = path.join(__dirname, '..', 'public')

app.use(express.static(distPath, {
  setHeaders: (res, filePath) => {
    if (/\.(js|css|woff2?|ttf|eot|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-store, must-revalidate')
    } else {
      res.setHeader('Cache-Control', 'no-cache')
    }
  }
}))

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`[startup] listening on :${PORT}`)
})
