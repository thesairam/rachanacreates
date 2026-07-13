import { motion } from 'framer-motion'

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          The Artist
        </motion.p>
        <motion.h2
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-2"
        >
          About Rachana - The Artist Behind the Henna
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className="text-muted text-lg md:text-xl max-w-2xl mb-10"
        >
          Welcome to the henna world created by Rachana.
        </motion.p>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <motion.article
            {...fade}
            transition={{ ...fade.transition, delay: 0.15 }}
            className="card p-6 md:p-8 leading-relaxed text-muted space-y-4"
          >
            <p>
              Based in <span className="text-text font-semibold">Amsterdam</span> and serving clients
              across the Netherlands — including <span className="text-text font-semibold">Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen, Haarlem</span> and beyond — I bring over <span className="text-text font-semibold">20 years
              of experience</span> in henna art. My journey began at a young age, driven by a natural
              passion I believe is a gift from God.
            </p>
            <p>
              I grew through practice and love for the art. During school, I regularly won first prize
              in henna competitions, with my work even being recognised in local newspapers, an
              experience that deeply motivated me.
            </p>
            <p>
              What started as a desire to have henna on my own hands soon turned into creating designs
              for friends, teachers, and even bridal clients during my school years.
            </p>
            <p>
              Today, I continue this journey by offering traditional Indian bridal henna using only
              natural ingredients. I also create designs for events, workshops, and gatherings,
              making henna a fun, interactive experience for everyone.
            </p>
          </motion.article>

          <motion.aside
            {...fade}
            transition={{ ...fade.transition, delay: 0.2 }}
            className="card p-6 md:p-8 flex flex-col gap-4"
          >
            <h3 className="text-xl md:text-2xl font-extrabold">Henna &amp; Mental Well-being</h3>
            <p className="text-muted leading-relaxed">
              Henna is more than art for me. It's a calming, mindful experience. The process
              brings focus, peace, and a deep sense of satisfaction. It helps me slow down, stay
              present, and end each day feeling grounded and fulfilled.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['20+ years', 'Amsterdam, NL', 'Bridal, Events & Workshops', '100% natural'].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full border border-border bg-bg text-text font-semibold text-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
