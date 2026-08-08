import { createContext, useContext, useState } from 'react'
import { en, nl } from '../i18n/translations'

const LanguageContext = createContext({ lang: 'en', t: en, setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('hbr_lang') === 'nl' ? 'nl' : 'en' } catch { return 'en' }
  })

  const setLang = (l) => {
    setLangState(l)
    try { localStorage.setItem('hbr_lang', l) } catch {}
  }

  const t = lang === 'nl' ? nl : en

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
