import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const heroImg = '/media/designs/bridal-henna-mehndi-rachana-amsterdam-netherlands.png'

const navigate = (id) => {
  const path = id === 'home' ? '/' : `/${id}`
  window.history.pushState({ section: id }, '', path)
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
  const HEADLINE = h.headline.split(' ')

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 px-6 md:px-10">
      <div className="container-x w-full grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs tracking-[0.3em] uppercase text-muted mb-5"
          >
            {h.eyebrow}
          </motion.p>

          <h1 className="font-extrabold leading-[1.05] text-[clamp(34px,5.2vw,64px)]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 + i * 0.07, ease: [0.2, 0.65, 0.3, 1] }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + HEADLINE.length * 0.07 }}
            className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed"
          >
            {h.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + HEADLINE.length * 0.07 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button onClick={() => navigate('designs')} className="button">{h.cta1}</button>
            <button onClick={() => navigate('contact')} className="button btn-alt">{h.cta2}</button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.65, 0.3, 1] }}
          className="md:col-span-5 card overflow-hidden aspect-[4/5]"
        >
          <img src={heroImg} alt="Bridal mehndi design by Rachana, henna artist in Amsterdam, Netherlands" className="placeholder" />
        </motion.div>
      </div>
    </section>
  )
}
