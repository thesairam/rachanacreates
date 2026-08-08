import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 }
}

const pricingImg = {
  en: '/media/designs/henna-mehndi-area-pricing-guide-rachana-amsterdam-netherlands.png',
  nl: '/media/designs/henna-mehndi-gebied-prijsgids-rachana-amsterdam-nederland.png',
}

export default function Services() {
  const { lang, t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="relative py-24 px-6 md:px-10">
      <div className="container-x flex flex-col gap-6">

        {/* ══ GROUP 1: Indian / Floral / Arabic bridal & event pricing — single card ══ */}
        <motion.div {...fade} className="card p-6 md:p-8 flex flex-col gap-8">

          {/* Header */}
          <div className="pb-2 border-b border-border">
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">{s.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">{s.h2}</h2>
            <p className="text-muted mt-1 text-sm font-medium">{s.subtitle}</p>
            <p className="text-muted mt-3 leading-relaxed">{s.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {s.chips.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-bg text-text font-semibold text-sm">{c}</span>
              ))}
            </div>
          </div>

          {/* Sub-section A: Henna by Packages */}
          <div>
            <h3 className="text-2xl font-extrabold">{s.packagesTitle}</h3>
            <span className="inline-block mt-1.5 mb-2 px-3 py-1 rounded-full bg-muted/40 border border-border text-xs font-semibold text-text tracking-wide">{s.designScope}</span>
            <p className="text-muted mt-1 mb-4 text-sm">{s.packagesSubtitle}</p>

            <div className="grid gap-2">
              <div className="hidden md:grid grid-cols-[1fr_1.6fr_0.5fr] bg-bg rounded-xl px-4 py-3 font-bold text-sm">
                <div>{s.tableService}</div>
                <div>{s.tableCoverage}</div>
                <div className="text-right">{s.tablePrice}</div>
              </div>
              {s.packages.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="grid md:grid-cols-[1fr_1.6fr_0.5fr] gap-2 bg-card border border-border rounded-xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 grid place-items-center bg-bg rounded-[10px] text-muted text-sm flex-shrink-0">✦</span>
                    <span className="font-bold">{p.name}</span>
                  </div>
                  <div className="leading-snug text-sm md:text-base">{p.coverage}</div>
                  <div className="md:text-right">
                    <span className="bg-muted text-[#0f3d2e] px-3 py-2 rounded-full font-bold text-sm">{p.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* Sub-section B: Henna by Area */}
          <div>
            <h3 className="text-2xl font-extrabold">{s.areaTitle}</h3>
            <span className="inline-block mt-1.5 mb-2 px-3 py-1 rounded-full bg-muted/40 border border-border text-xs font-semibold text-text tracking-wide">{s.designScope}</span>
            <p className="text-muted mt-1 mb-4 text-sm">{s.areaSubtitle}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {s.alaCarte.map((it, i) => (
                <motion.article
                  key={it.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-[0_10px_26px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-8 h-8 grid place-items-center bg-bg rounded-[10px] text-muted font-extrabold">{it.step}</div>
                  <div>
                    <div className="font-bold">{it.name}</div>
                    <div className="text-muted text-sm">{it.detail}</div>
                  </div>
                  <div className="font-extrabold bg-muted text-[#0f3d2e] px-3 py-1.5 rounded-[10px] border border-black/15 text-sm">{it.price}</div>
                </motion.article>
              ))}
            </div>

            <figure className="card mt-5 p-0 overflow-hidden">
              <img
                src={pricingImg[lang]}
                alt={lang === 'nl' ? 'Henna gebied prijsgids — pols, midden arm, elleboog, boven elleboog door Rachana Amsterdam' : 'Henna area pricing guide — wrist, mid arm, elbow, above elbow by Rachana Amsterdam Netherlands'}
                className="block w-[70%] h-auto mx-auto"
              />
              <figcaption className="px-3 py-2 text-muted text-sm">{s.areaFigCaption}</figcaption>
            </figure>
          </div>

          {/* Shared rules — once only */}
          <ul className="pl-5 list-disc text-muted leading-relaxed text-sm space-y-1">
            {s.sharedNotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </motion.div>

        {/* ══ GROUP 2: Party / Events / Special — clearly separate ══ */}

        {/* Visual separator */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs tracking-[0.25em] uppercase text-muted px-2 whitespace-nowrap">{s.separator}</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <motion.div {...fade} className="card p-6 md:p-8 border border-accent/20 bg-card/60">
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">{s.partyEyebrow}</p>
          <h3 className="text-2xl font-extrabold">{s.partyTitle}</h3>
          <p className="text-muted mt-1 mb-5 text-sm">{s.partySubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {s.partyItems.map((it, i) => (
              <motion.article
                key={it.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl shadow-[0_10px_26px_rgba(0,0,0,0.2)]"
              >
                <div className="w-9 h-9 flex-shrink-0 grid place-items-center bg-bg rounded-[10px] text-muted font-extrabold text-sm">{it.step}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold leading-snug">{it.name}</div>
                  <div className="text-muted text-sm">{it.detail}</div>
                </div>
                <div className="flex-shrink-0 font-extrabold bg-muted text-[#0f3d2e] px-3 py-1.5 rounded-[10px] border border-black/15 text-sm">{it.price}</div>
              </motion.article>
            ))}
          </div>

          <ul className="mt-5 pl-5 list-disc text-muted leading-relaxed text-sm space-y-1">
            {s.partyNotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}
