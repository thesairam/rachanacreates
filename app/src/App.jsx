import { useLenis } from './hooks/useLenis'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import WhatIsHenna from './components/WhatIsHenna.jsx'
import DesignsScroll from './components/DesignsScroll.jsx'
import Services from './components/Services.jsx'
import AboutContact from './components/AboutContact.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

function Site() {
  useLenis()
  return (
    <div className="bg-bg text-text pb-16 md:pb-14">
      <Nav />
      <Hero />
      <WhatIsHenna />
      <DesignsScroll />
      <Services />
      <AboutContact />
      <FAQ />
      <Footer />
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
