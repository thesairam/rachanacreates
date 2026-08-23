import { useLenis } from './hooks/useLenis'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import WhatIsHenna from './components/WhatIsHenna.jsx'
import DesignsScroll from './components/DesignsScroll.jsx'
import Services from './components/Services.jsx'
import AboutArtist from './components/AboutArtist.jsx'
import Contact from './components/Contact.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

function FloatingButtons() {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3">
      <a
        href="https://www.instagram.com/henna.by.rachana"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        title="Follow on Instagram"
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="26" height="26" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      </a>
      <a
        href="https://wa.me/31649222922"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.532 5.86L.057 23.215a.75.75 0 0 0 .918.899l5.453-1.43A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.964-1.357l-.355-.212-3.68.965.983-3.594-.232-.37A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      </a>
    </div>
  )
}

function Site() {
  useLenis()
  return (
    <div className="bg-bg text-text pb-16 md:pb-14">
      <Nav />
      <Hero />
      <WhatIsHenna />
      <DesignsScroll />
      <Services />
      <AboutArtist />
      <Contact />
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
