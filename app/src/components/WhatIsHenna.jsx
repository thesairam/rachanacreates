import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

export default function WhatIsHenna() {
  const { t } = useLanguage()
  const w = t.whatIsHenna

  return (
    <section id="what-is-henna" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          {w.eyebrow}
        </motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
          {w.h2}
        </motion.h2>
        <motion.p {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-muted mb-10">
          {w.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <motion.figure
            {...fade}
            transition={{ ...fade.transition, delay: 0.05 }}
            className="card overflow-hidden"
          >
            <img
              src="/media/informative/henna-mehandi-what-is-information-guide.png"
              alt="Hands adorned with henna, natural plant-based body art"
              className="placeholder aspect-[4/5] md:aspect-auto md:h-full"
            />
          </motion.figure>

          <div className="flex flex-col gap-5">
            <motion.article
              {...fade}
              transition={{ ...fade.transition, delay: 0.1 }}
              className="card p-6 md:p-7"
            >
              <h3 className="text-xl md:text-2xl font-extrabold mb-3">{w.card1Title}</h3>
              <p className="text-muted leading-relaxed">{w.card1Text}</p>
            </motion.article>

            <motion.article
              {...fade}
              transition={{ ...fade.transition, delay: 0.18 }}
              className="card p-6 md:p-7"
            >
              <h3 className="text-xl md:text-2xl font-extrabold mb-3">{w.card2Title}</h3>
              <p className="text-muted leading-relaxed">{w.card2Text1}</p>
              <p className="text-muted leading-relaxed mt-3">{w.card2Text2}</p>
            </motion.article>

            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.26 }}
              className="flex flex-wrap gap-2"
            >
              {w.chips.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-card text-text font-semibold text-sm">
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
