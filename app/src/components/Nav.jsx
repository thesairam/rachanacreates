import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const navIds = ['home', 'designs', 'services', 'about']

const getActiveSection = () => window.location.pathname.slice(1) || 'home'

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function LangToggle({ lang, setLang, className = '' }) {
  return (
    <div className={`flex items-center bg-card border border-border rounded-[10px] p-0.5 ${className}`}>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-[8px] text-sm font-bold transition-colors ${lang === 'en' ? 'bg-bg text-text' : 'text-muted hover:text-text'}`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLang('nl')}
        className={`px-3 py-1.5 rounded-[8px] text-sm font-bold transition-colors ${lang === 'nl' ? 'bg-bg text-text' : 'text-muted hover:text-text'}`}
        aria-pressed={lang === 'nl'}
      >
        NL
      </button>
    </div>
  )
}

export default function Nav() {
  const { lang, t, setLang } = useLanguage()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(getActiveSection())

  const links = navIds.map((id) => ({ id, label: t.nav[id] || id }))

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
      for (const id of navIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { scrollToSection(active) }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid || open ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-3 font-extrabold tracking-wide text-text text-[22px] bg-transparent border-0 cursor-pointer"
        >
          <img src="/media/logo/henna-by-rachana-mehandi-artist-logo.png" alt="Henna By Rachana logo" className="w-12 h-12 rounded-xl object-cover bg-bg" />
          <span className="whitespace-nowrap">Henna By Rachana</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
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

          {/* Language toggle — desktop */}
          <LangToggle lang={lang} setLang={setLang} className="hidden md:flex" />

          {/* Hamburger — mobile */}
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
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden container-x overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pb-4">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`px-4 py-3 rounded-[10px] text-[17px] bg-transparent border-0 cursor-pointer text-left w-full ${
                active === l.id ? 'bg-card text-text' : 'text-muted'
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="pt-2 pb-1 px-1">
            <LangToggle lang={lang} setLang={setLang} className="w-fit" />
          </div>
        </div>
      </nav>
    </header>
  )
}
