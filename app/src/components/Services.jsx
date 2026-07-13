import { motion } from 'framer-motion'

const services = [
  { name: 'Standard Service', coverage: 'Both hands till 1/2 arm length + minimal design on both legs', price: '€150' },
  { name: 'Premium Service', coverage: 'Both hands till elbow length + minimal design on both legs', price: '€250' },
  { name: 'Bridal Service', coverage: 'Both hands above elbow length + minimal design on both legs', price: '€350' }
]

const alaCarte = [
  { step: '1', name: 'Wrist', detail: 'One side', price: '€10' },
  { step: '2', name: 'Mid Arm', detail: 'One side', price: '€30' },
  { step: '3', name: 'Elbow', detail: 'One side', price: '€60' },
  { step: '4', name: 'Above Elbow', detail: 'One side', price: '€100' }
]

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 }
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 md:px-10">
      <div className="container-x flex flex-col gap-6">
        <motion.div {...fade} className="card p-6 md:p-8 grid md:grid-cols-[1.4fr_1fr] gap-5 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-2">Henna By Rachana</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Services</h2>
            <p className="text-muted mt-3 leading-relaxed">
              Clear coverage, clear prices. Choose a service or build your own based on coverage.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Travel-friendly', 'Custom designs on request', 'Both hands or full bridal'].map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full border border-border bg-card text-text font-semibold text-sm">{c}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...fade} className="card p-6 md:p-8">
          <h3 className="text-2xl font-extrabold">Services</h3>
          <p className="text-muted mt-1 mb-4">Coverage, price and inclusions.</p>

          <div className="grid gap-2">
            <div className="hidden md:grid grid-cols-[1fr_1.4fr_0.5fr] bg-bg rounded-xl px-4 py-3 font-bold">
              <div>Services</div>
              <div>Areas Covered</div>
              <div className="text-right">Price</div>
            </div>
            {services.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid md:grid-cols-[1fr_1.4fr_0.5fr] gap-2 bg-card border border-border rounded-xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 grid place-items-center bg-bg rounded-[10px] text-muted text-sm">✦</span>
                  <span className="font-bold">{p.name}</span>
                </div>
                <div className="leading-snug">{p.coverage}</div>
                <div className="md:text-right">
                  <span className="bg-muted text-[#0f3d2e] px-3 py-2 rounded-full font-bold">{p.price}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <ul className="mt-4 pl-5 list-disc text-muted leading-relaxed">
            <li>Prices may vary based on design complexity.</li>
            <li>Both legs include minimal design to echo the reference layout.</li>
            <li>Prices exclude a convenience fee, which will be added separately and covers travel charges and time to your location.</li>
            <li>Prices exclude BTW (VAT) where applicable.</li>
          </ul>
        </motion.div>

        <motion.div {...fade} className="card p-6 md:p-8">
          <h3 className="text-2xl font-extrabold">Henna by Area (One Side)</h3>
          <p className="text-muted mt-1 mb-4">Mix and match coverage by area.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {alaCarte.map((it, i) => (
              <motion.article
                key={it.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-[0_10px_26px_rgba(0,0,0,0.2)]"
              >
                <div className="w-8 h-8 grid place-items-center bg-bg rounded-[10px] text-muted font-extrabold">{it.step}</div>
                <div>
                  <div className="font-bold">{it.name}</div>
                  <div className="text-muted text-sm">{it.detail}</div>
                </div>
                <div className="font-extrabold bg-muted text-[#0f3d2e] px-3 py-1.5 rounded-[10px] border border-black/15">{it.price}</div>
              </motion.article>
            ))}
          </div>

          <figure className="card mt-5 p-0 overflow-hidden">
            <img src="/media/designs/netherlands-henna-mehandi-pricing-map.jpeg" alt="One-side henna pricing reference" className="block w-[70%] h-auto mx-auto" />
            <figcaption className="px-3 py-2 text-muted text-sm">
              Reference visual: wrist, mid arm, elbow, and above elbow coverage.
            </figcaption>
          </figure>

          <ul className="mt-4 pl-5 list-disc text-muted leading-relaxed">
            <li>Prices may vary based on design complexity.</li>
            <li>Both sides available on request.</li>
            <li>Bridal and custom designs are priced separately.</li>
            <li>Prices exclude a convenience fee, which will be added separately and covers travel charges and time to your location.</li>
            <li>Prices exclude BTW (VAT) where applicable.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
