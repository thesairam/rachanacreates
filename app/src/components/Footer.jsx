import { useState } from 'react'
import LegalModal from './LegalModal'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/henna.by.rachana',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/henna.by.rachana/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.7H7.8V14h2.7v8h3z"/>
      </svg>
    )
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@henna_by_rachana_',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 3c.4 1.7 1.3 3.1 2.7 4 .8.5 1.7.8 2.6.9v3c-1.6 0-3.1-.4-4.5-1.2v6.6c0 3.5-2.8 6.3-6.3 6.3S4.7 19.8 4.7 16.3 7.5 10 11 10c.4 0 .8 0 1.2.1v3.1c-.4-.1-.8-.2-1.2-.2-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V3h2.2z"/>
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Henna.by.Rachana',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4C3.3 5.6 2.6 6.3 2.4 7.2 2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/>
      </svg>
    )
  }
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [legalOpen, setLegalOpen] = useState(false)

  return (
    <>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(false)} />
      <footer
        className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-bg2/95 backdrop-blur"
        role="contentinfo"
      >
      <div className="container-x py-3 flex flex-wrap items-center justify-between gap-3 text-muted text-sm">
        <div className="flex items-center gap-3">
          <span>© {year} Henna By Rachana</span>
          <span className="opacity-60">·</span>
          <button onClick={() => setLegalOpen(true)} className="underline hover:text-text transition-colors bg-transparent border-0 cursor-pointer text-sm text-muted p-0">Legal</button>
        </div>
        <ul className="flex items-center gap-1.5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted hover:text-text hover:border-accent hover:bg-card transition-colors"
              >
                <span className="w-[18px] h-[18px] block">{s.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
    </>
  )
}
