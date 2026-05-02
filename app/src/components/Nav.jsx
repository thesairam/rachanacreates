import { useEffect, useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'featured', label: 'Featured' },
  { id: 'designs', label: 'Designs' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' }
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 60)

      let current = 'home'
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 120) current = l.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <a href="#home" onClick={() => setOpen(false)} className="inline-flex items-center gap-3 font-extrabold tracking-wide text-text text-[22px]">
          <img src="/media/logo/logo.png" alt="Henna By Rachana logo" className="w-12 h-12 rounded-xl object-cover bg-bg" />
          <span className="whitespace-nowrap">Henna By Rachana</span>
        </a>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden border border-border rounded-[10px] w-11 h-11 flex flex-col items-center justify-center gap-[5px] bg-transparent"
        >
          <span className={`block w-[22px] h-[2px] bg-text rounded transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-text rounded transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-text rounded transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>

        <nav className="hidden md:flex items-center gap-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`px-4 py-2 rounded-xl text-[17px] transition-colors ${
                active === l.id ? 'bg-card text-text' : 'text-muted hover:text-text'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <nav
        className={`md:hidden container-x overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-[400px]' : 'max-h-0'}`}
        onClick={() => setOpen(false)}
      >
        <div className="flex flex-col gap-1 pb-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`px-4 py-3 rounded-[10px] text-[17px] ${active === l.id ? 'bg-card text-text' : 'text-muted'}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
