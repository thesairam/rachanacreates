import { motion } from 'framer-motion'

const items = [
  { url: '/media/designs/1.png', alt: 'Design 1' },
  { url: '/media/designs/2.png', alt: 'Design 2' },
  { url: '/media/designs/3.png', alt: 'Design 3' }
]

export default function Featured() {
  return (
    <section id="featured" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold mb-2"
        >
          Featured Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted mb-10"
        >
          A glimpse of recent work — from minimal to bridal-intricate.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.a
              key={it.url}
              href="#designs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 1] }}
              className="card overflow-hidden aspect-square block"
            >
              <img src={it.url} alt={it.alt} className="placeholder" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
