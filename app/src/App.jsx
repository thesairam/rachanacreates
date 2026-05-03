import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import WhatIsHenna from './components/WhatIsHenna.jsx'
import DesignsScroll from './components/DesignsScroll.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useLenis()

  return (
    <div className="bg-bg text-text pb-16 md:pb-14">
      <Nav />
      <Hero />
      <WhatIsHenna />
      <DesignsScroll />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
