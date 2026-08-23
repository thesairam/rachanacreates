import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

export default function AboutArtist() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="relative py-24 px-6 md:px-10">
      <div className="container-x flex flex-col gap-5">
        <div>
          <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">{a.eyebrow}</motion.p>
          <motion.h2 {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
            {a.h2}
          </motion.h2>
          <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="text-muted text-lg md:text-xl max-w-2xl">
            {a.subtitle}
          </motion.p>
        </div>

        {/* Card 1 — bio + photo side by side */}
        <motion.article
          {...fade}
          transition={{ ...fade.transition, delay: 0.15 }}
          className="card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="leading-relaxed text-muted space-y-4 md:flex-1">
            {a.bio.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <figure className="flex flex-col items-center gap-3 flex-shrink-0 m-0">
            <div className="w-48 h-64 md:w-56 md:h-72 overflow-hidden border-4 border-white shadow-xl" style={{ borderRadius: '50%' }}>
              <img
                src="/media/rachana-henna-artist-portrait-amsterdam-netherlands.jpg"
                alt="Rachana, professional henna artist based in Amsterdam, Netherlands"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <figcaption className="text-center font-semibold text-muted text-sm tracking-wide">
              Meet the Henna Artist
            </figcaption>
          </figure>
        </motion.article>

        {/* Card 2 — wellbeing */}
        <motion.aside
          {...fade}
          transition={{ ...fade.transition, delay: 0.2 }}
          className="card p-6 md:p-8 flex flex-col gap-4"
        >
          <h3 className="text-xl md:text-2xl font-extrabold">{a.wellbeingTitle}</h3>
          <p className="text-muted leading-relaxed">{a.wellbeingText}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {a.chips.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-bg text-text font-semibold text-sm">{c}</span>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
