import { useEffect, useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'designs', label: 'Designs' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About the Artist' },
  { id: 'contact', label: 'Contact' }
]

const getActiveSection = () => {
  const path = window.location.pathname.slice(1) || 'home'
  return path
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(getActiveSection())

  const navigate = (id) => {
    setOpen(false)
    const path = id === 'home' ? '/' : `/${id}`
    window.history.pushState({ section: id }, '', path)
    scrollToSection(id)
    setActive(id)
  }

  useEffect(() => {
    const onPopState = (e) => {
      const section = e.state?.section || 'home'
      setActive(section)
      scrollToSection(section)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  useEffect(() => {
    scrollToSection(active)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid || open ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-3 font-extrabold tracking-wide text-text text-[22px] bg-transparent border-0 cursor-pointer">
          <img src="/media/logo/henna-by-rachana-mehandi-artist-logo.png" alt="Henna By Rachana logo" className="w-12 h-12 rounded-xl object-cover bg-bg" />
          <span className="whitespace-nowrap">Henna By Rachana</span>
        </button>

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
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`px-4 py-2 rounded-xl text-[17px] transition-colors bg-transparent border-0 cursor-pointer ${
                active === l.id ? 'bg-card text-text' : 'text-muted hover:text-text'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>

      <nav
        className={`md:hidden container-x overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-[400px]' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pb-3">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`px-4 py-3 rounded-[10px] text-[17px] bg-transparent border-0 cursor-pointer text-left w-full ${active === l.id ? 'bg-card text-text' : 'text-muted'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
