import { useState } from 'react'
import { motion } from 'framer-motion'

const initial = { name: '', email: '', message: '', consent: false }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [showPolicy, setShowPolicy] = useState(false)
  const [status, setStatus] = useState({ kind: 'idle', msg: '' })

  const update = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.consent) {
      setStatus({ kind: 'error', msg: 'Please confirm you have read the privacy notice and consent to your data being used to reply.' })
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ kind: 'error', msg: 'Please fill name, email and message.' })
      return
    }

    const subject = encodeURIComponent(`Booking enquiry — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n— Sent from hennabyrachana.com (consent given on ${new Date().toISOString()})`
    )
    window.location.href = `mailto:hello@hennabyrachana.com?subject=${subject}&body=${body}`
    setStatus({ kind: 'ok', msg: 'Opening your email app to send the enquiry.' })
  }

  const onClear = () => {
    setForm(initial)
    setStatus({ kind: 'idle', msg: 'Form cleared. No data is stored.' })
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
          For bookings and enquiries — drop a message below, or reach out on Instagram or WhatsApp.
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
                  <strong>Controller:</strong> Henna By Rachana, Amsterdam, NL — hello@hennabyrachana.com.
                </p>
                <p className="mt-2">
                  <strong>What we collect:</strong> the name, email and message you submit.
                </p>
                <p className="mt-2">
                  <strong>Why:</strong> only to reply to your enquiry. Lawful basis: your consent (GDPR Art. 6(1)(a)).
                </p>
                <p className="mt-2">
                  <strong>How:</strong> the form opens your email client with the message — nothing is stored on this website,
                  no analytics, cookies or third-party trackers are used here.
                </p>
                <p className="mt-2">
                  <strong>Retention:</strong> we keep correspondence only as long as needed to handle your booking, then delete it.
                  We never share or sell your data.
                </p>
                <p className="mt-2">
                  <strong>Your rights:</strong> access, rectification, erasure, restriction, objection, portability,
                  and to lodge a complaint with the Autoriteit Persoonsgegevens. Email the studio to exercise any of these.
                </p>
              </motion.div>
            )}

            {status.msg && (
              <p className={`text-sm ${status.kind === 'error' ? 'text-accent' : 'text-muted'}`}>{status.msg}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-2">
              <button type="submit" className="button">Send enquiry</button>
              <button type="button" onClick={onClear} className="button btn-alt">Clear form</button>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
