import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const CONTACT_ENDPOINT = '/api/contact'
const initial = { name: '', email: '', message: '', website: '', consent: false }

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

function AboutSection({ a }) {
  return (
    <div>
      <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">{a.eyebrow}</motion.p>
      <motion.h2 {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
        {a.h2}
      </motion.h2>
      <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="text-muted text-lg md:text-xl max-w-2xl mb-8">
        {a.subtitle}
      </motion.p>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
        <motion.article {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="card p-6 md:p-8 leading-relaxed text-muted space-y-4">
          {a.bio.map((para, i) => <p key={i}>{para}</p>)}
        </motion.article>

        <motion.aside {...fade} transition={{ ...fade.transition, delay: 0.2 }} className="card p-6 md:p-8 flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl font-extrabold">{a.wellbeingTitle}</h3>
          <p className="text-muted leading-relaxed">{a.wellbeingText}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {a.chips.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-bg text-text font-semibold text-sm">{c}</span>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  )
}

function ContactSection({ c }) {
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
    if (!form.consent) { setStatus({ kind: 'error', msg: c.errorConsent }); return }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setStatus({ kind: 'error', msg: c.errorFields }); return }

    setSubmitting(true)
    setStatus({ kind: 'idle', msg: '' })
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, website: form.website, consent_given_at: new Date().toISOString() }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) { setStatus({ kind: 'ok', msg: c.successMsg }); setForm(initial) }
      else setStatus({ kind: 'error', msg: data?.error || c.errorNetwork })
    } catch { setStatus({ kind: 'error', msg: c.errorNetwork }) }
    finally { setSubmitting(false) }
  }

  const onClear = () => { setForm(initial); setStatus({ kind: 'idle', msg: '' }) }

  return (
    <div id="contact">
      <motion.h2 {...fade} className="text-3xl md:text-4xl font-extrabold mb-2">{c.h2}</motion.h2>
      <motion.p {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-muted mb-8">{c.subtitle}</motion.p>

      <div className="grid md:grid-cols-2 gap-5">
        <motion.form
          onSubmit={onSubmit}
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className="card p-6 md:p-7 flex flex-col gap-3"
          noValidate
        >
          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} /></label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{c.nameLabel}</span>
            <input value={form.name} onChange={update('name')} type="text" autoComplete="name" required className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent" />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{c.emailLabel}</span>
            <input value={form.email} onChange={update('email')} type="email" autoComplete="email" required className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent" />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{c.messageLabel}</span>
            <textarea value={form.message} onChange={update('message')} rows={5} required className="bg-bg border border-border rounded-xl px-3 py-2.5 text-text outline-none focus:border-accent resize-y" />
          </label>

          <label className="flex items-start gap-2.5 mt-1 text-sm text-muted leading-snug">
            <input type="checkbox" checked={form.consent} onChange={update('consent')} className="mt-1 accent-accent" required />
            <span>
              {c.consentPrefix}
              <button type="button" onClick={() => setShowPolicy((v) => !v)} className="underline text-text">{c.consentLink}</button>
              {c.consentSuffix}
            </span>
          </label>

          {showPolicy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-bg border border-border rounded-xl p-4 text-sm text-muted leading-relaxed"
            >
              <strong className="text-text block mb-1">{c.privacyTitle}</strong>
              <p><strong>{c.privacyController}</strong> {c.privacyControllerVal}</p>
              <p className="mt-2"><strong>{c.privacyCollect}</strong> {c.privacyCollectVal}</p>
              <p className="mt-2"><strong>{c.privacyWhy}</strong> {c.privacyWhyVal}</p>
              <p className="mt-2"><strong>{c.privacyHow}</strong> {c.privacyHowVal}</p>
              <p className="mt-2"><strong>{c.privacySub}</strong> {c.privacySubVal}</p>
              <p className="mt-2"><strong>{c.privacyRetention}</strong> {c.privacyRetentionVal}</p>
              <p className="mt-2"><strong>{c.privacyRights}</strong> {c.privacyRightsVal}</p>
            </motion.div>
          )}

          {status.msg && (
            <p className={`text-sm ${status.kind === 'error' ? 'text-accent' : 'text-muted'}`}>{status.msg}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-2">
            <button type="submit" className="button" disabled={submitting} aria-busy={submitting}>
              {submitting ? c.sending : c.submitBtn}
            </button>
            <button type="button" onClick={onClear} className="button btn-alt" disabled={submitting}>{c.clearBtn}</button>
          </div>
        </motion.form>

        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="card p-6 md:p-7 flex flex-col gap-4">
          <h3 className="text-xl font-extrabold">{c.directTitle}</h3>
          <p className="text-muted m-0">{c.directSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <a className="button" href="https://instagram.com/henna.by.rachana" target="_blank" rel="noopener noreferrer">{c.igBtn}</a>
            <a className="button btn-alt" href="https://wa.me/31649222922" target="_blank" rel="noopener noreferrer">{c.waBtn}</a>
          </div>
          <p className="text-muted text-sm m-0">
            Instagram: <strong className="text-text">@henna.by.rachana</strong><br />
            WhatsApp: <strong className="text-text">+31 64 922 2922</strong>
          </p>
          <p className="text-muted text-xs leading-relaxed mt-2">{c.directDisclaimer}</p>
          <div className="border-t border-border pt-4 text-xs text-muted leading-relaxed space-y-0.5">
            <p className="font-semibold text-text mb-1">{c.businessTitle}</p>
            <p>Henna By Rachana</p>
            <p>KVK 42110227</p>
            <p>Amsterdam, Netherlands</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutContact() {
  const { t } = useLanguage()
  return (
    <section id="about" className="relative py-24 px-6 md:px-10">
      <div className="container-x flex flex-col gap-20">
        <AboutSection a={t.about} />
        <ContactSection c={t.contact} />
      </div>
    </section>
  )
}
