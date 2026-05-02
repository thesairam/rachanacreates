import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Featured from './components/Featured.jsx'
import DesignsScroll from './components/DesignsScroll.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useLenis()

  return (
    <div className="bg-bg text-text">
      <Nav />
      <Hero />
      <Featured />
      <DesignsScroll />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
