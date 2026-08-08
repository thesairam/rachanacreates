import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          {a.eyebrow}
        </motion.p>
        <motion.h2 {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
          {a.h2}
        </motion.h2>
        <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="text-muted text-lg md:text-xl max-w-2xl mb-10">
          {a.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <motion.article {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="card p-6 md:p-8 leading-relaxed text-muted space-y-4">
            {a.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.article>

          <motion.aside {...fade} transition={{ ...fade.transition, delay: 0.2 }} className="card p-6 md:p-8 flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-extrabold">{a.wellbeingTitle}</h3>
            <p className="text-muted leading-relaxed">{a.wellbeingText}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {a.chips.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-bg text-text font-semibold text-sm">{c}</span>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
