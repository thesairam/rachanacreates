import { motion } from 'framer-motion'

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }
}

export default function WhatIsHenna() {
  return (
    <section id="what-is-henna" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          About Henna
        </motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-extrabold leading-tight mb-10">
          What is Henna?
        </motion.h2>

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
              <h3 className="text-xl md:text-2xl font-extrabold mb-3">A natural body art</h3>
              <p className="text-muted leading-relaxed">
                Henna, also called Mehandi, is a natural dye used to create temporary designs on the
                skin, especially on the hands and feet during celebrations. It leaves a reddish-brown
                stain that slowly fades over about a week or two, making it a safe, painless, and
                completely natural option for body art.
              </p>
            </motion.article>

            <motion.article
              {...fade}
              transition={{ ...fade.transition, delay: 0.18 }}
              className="card p-6 md:p-7"
            >
              <h3 className="text-xl md:text-2xl font-extrabold mb-3">What it's made of</h3>
              <p className="text-muted leading-relaxed">
                Henna is made from the dried leaves of the henna plant, a small flowering shrub
                called <em className="text-text not-italic font-semibold">Lawsonia inermis</em>. The
                leaves are ground into a fine powder and mixed with liquids like water, lemon juice,
                or tea, along with essential oils such as eucalyptus or lavender to deepen and improve
                the stain.
              </p>
              <p className="text-muted leading-relaxed mt-3">
                The henna used here is <span className="text-text font-semibold">100% natural</span>.
                Once applied, the colour develops over time and gradually fades as the skin naturally
                sheds.
              </p>
            </motion.article>

            <motion.div
              {...fade}
              transition={{ ...fade.transition, delay: 0.26 }}
              className="flex flex-wrap gap-2"
            >
              {['100% natural', 'Skin-safe', 'No chemicals', 'Plant-based'].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-full border border-border bg-card text-text font-semibold text-sm"
                >
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
