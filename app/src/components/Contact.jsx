import { useState } from 'react'
import { motion } from 'framer-motion'

const initial = { name: '', email: '', message: '', website: '', consent: false }
const CONTACT_ENDPOINT = '/api/contact'

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [showPolicy, setShowPolicy] = useState(false)
  const [status, setStatus] = useState({ kind: 'idle', msg: '' })
  const [submitting, setSubmitting] = useState(false)

  const update = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      setStatus({ kind: 'error', msg: 'Please confirm you have read the privacy notice and consent to your data being used to reply.' })
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ kind: 'error', msg: 'Please fill name, email and message.' })
      return
    }

    setSubmitting(true)
    setStatus({ kind: 'idle', msg: 'Sending your enquiry...' })

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          website: form.website,
          consent_given_at: new Date().toISOString()
        })
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus({ kind: 'ok', msg: 'Thanks! Your enquiry has been sent. Rachana will reply by email soon.' })
        setForm(initial)
      } else {
        const msg = data?.error || 'Something went wrong sending the form. Please try again, or email hennabyrachana@gmail.com.'
        setStatus({ kind: 'error', msg })
      }
    } catch {
      setStatus({ kind: 'error', msg: 'Network error. Please try again, or email hennabyrachana@gmail.com directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  const onClear = () => {
    setForm(initial)
    setStatus({ kind: 'idle', msg: 'Form cleared.' })
  }

  return (
    <section id="contact" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold mb-2"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted mb-8"
        >
          For bookings and enquiries, drop a message below or reach out on Instagram or WhatsApp.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="card p-6 md:p-7 flex flex-col gap-3"
            noValidate
          >
            {/* Honeypot - hidden from real users via aria + tab + visual; bots fill it. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={update('website')}
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-muted">Name</span>
              <input
                value={form.name}
                onChange={update('name')}
                type="text"
                autoComplete="name"
                required
                className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-muted">Email</span>
              <input
                value={form.email}
                onChange={update('email')}
                type="email"
                autoComplete="email"
                required
                className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-muted">Message</span>
              <textarea
                value={form.message}
                onChange={update('message')}
                rows={5}
                required
                className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent resize-y"
              />
            </label>

            <label className="flex items-start gap-2.5 mt-1 text-sm text-muted leading-snug">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={update('consent')}
                className="mt-1 accent-accent"
                required
              />
              <span>
                I have read the{' '}
                <button type="button" onClick={() => setShowPolicy((v) => !v)} className="underline text-text">
                  privacy notice
                </button>{' '}
                and consent to Henna By Rachana using the details I provided to reply to my enquiry.
                I can withdraw consent at any time by emailing the studio.
              </span>
            </label>

            {showPolicy && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-bg border border-border rounded-xl p-4 text-sm text-muted leading-relaxed"
              >
                <strong className="text-text block mb-1">Privacy notice (GDPR)</strong>
                <p>
                  <strong>Controller:</strong> Henna By Rachana, Amsterdam, NL - hennabyrachana@gmail.com.
                </p>
                <p className="mt-2">
                  <strong>What we collect:</strong> the name, email and message you submit through this
                  form, plus the timestamp of your consent.
                </p>
                <p className="mt-2">
                  <strong>Why:</strong> only to reply to your enquiry and arrange your booking. Lawful
                  basis: your consent (GDPR Art. 6(1)(a)).
                </p>
                <p className="mt-2">
                  <strong>How the form works:</strong> on submit, your message is sent to our own
                  small server hosted on DigitalOcean (EU region), which immediately relays it as an
                  email to our Gmail inbox via Google's SMTP service. The server does not log
                  the contents of your message and does not store it in any database. No analytics,
                  cookies, or third-party trackers are used on this site.
                </p>
                <p className="mt-2">
                  <strong>Sub-processors:</strong> DigitalOcean (hosting, EU region) and Google
                  (Gmail SMTP and inbox storage) process your data on our behalf. Their own privacy
                  policies apply.
                </p>
                <p className="mt-2">
                  <strong>Retention:</strong> we keep correspondence only as long as needed to handle
                  your booking and any follow-up, then delete it. We never share or sell your data.
                </p>
                <p className="mt-2">
                  <strong>Your rights:</strong> access, rectification, erasure, restriction, objection,
                  portability, and to lodge a complaint with the Autoriteit Persoonsgegevens. Email the
                  studio at <strong>hennabyrachana@gmail.com</strong> to exercise any of these or to
                  withdraw your consent at any time.
                </p>
              </motion.div>
            )}

            {status.msg && (
              <p className={`text-sm ${status.kind === 'error' ? 'text-accent' : 'text-muted'}`}>{status.msg}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-2">
              <button type="submit" className="button" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending...' : 'Send enquiry'}
              </button>
              <button type="button" onClick={onClear} className="button btn-alt" disabled={submitting}>
                Clear form
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6 md:p-7 flex flex-col gap-4"
          >
            <h3 className="text-xl font-extrabold">Direct channels</h3>
            <p className="text-muted m-0">Prefer a quick chat? Reach out directly:</p>
            <div className="flex flex-wrap gap-3">
              <a className="button" href="https://instagram.com/henna.by.rachana" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="button btn-alt" href="https://wa.me/31649222922" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <p className="text-muted text-sm m-0">
              Instagram: <strong className="text-text">@henna.by.rachana</strong><br />
              WhatsApp: <strong className="text-text">+31 64 922 2922</strong>
            </p>
            <p className="text-muted text-xs leading-relaxed mt-2">
              These links take you to third-party services (Meta, WhatsApp). Their own privacy policies apply once you leave this site.
            </p>
            <div className="border-t border-border pt-4 text-xs text-muted leading-relaxed space-y-0.5">
              <p className="font-semibold text-text mb-1">Business details</p>
              <p>Henna By Rachana</p>
              <p>KVK 42110227</p>
              <p>Amsterdam, Netherlands</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
