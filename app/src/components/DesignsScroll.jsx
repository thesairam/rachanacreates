import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const items = [
  { url: '/media/designs/bridal-henna-mehandi-design-netherlands-artist.png', alt: 'Design 1', tag: 'Bridal' },
  { url: '/media/designs/arabic-henna-mehandi-design-netherlands-artist.png', alt: 'Design 2', tag: 'Arabic' },
  { url: '/media/designs/indo-western-henna-mehandi-design-netherlands-artist.png', alt: 'Design 3', tag: 'Indo-Western' },
  { url: '/media/designs/festive-henna-mehandi-design-netherlands-artist.png', alt: 'Design 4', tag: 'Festive' }
]

const featured = [
  { url: '/media/designs/bridal-henna-mehandi-design-netherlands-artist.png', alt: 'Featured design 1' },
  { url: '/media/designs/arabic-henna-mehandi-design-netherlands-artist.png', alt: 'Featured design 2' },
  { url: '/media/designs/indo-western-henna-mehandi-design-netherlands-artist.png', alt: 'Featured design 3' }
]

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 }
}

export default function DesignsScroll() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    function update() {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const p = scrolled / total
      const maxX = track.scrollWidth - window.innerWidth
      track.style.transform = `translate3d(${-p * Math.max(0, maxX)}px, 0, 0)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="designs" className="relative bg-bg2">
      {/* Featured subsection */}
      <div className="py-20 px-6 md:px-10">
        <div className="container-x">
          <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Designs
          </motion.p>
          <motion.h2
            {...fade}
            transition={{ ...fade.transition, delay: 0.05 }}
            className="text-3xl md:text-5xl font-extrabold mb-2"
          >
            Featured Works
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="text-muted mb-10"
          >
            A glimpse of recent work, from minimal to bridal-intricate.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((it, i) => (
              <motion.button
                key={it.url}
                onClick={() => {
                  const el = document.getElementById('designs-gallery')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 1] }}
                className="card overflow-hidden aspect-square block bg-transparent border-0 cursor-pointer"
              >
                <img src={it.url} alt={it.alt} className="placeholder" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll gallery subsection */}
      <div
        id="designs-gallery"
        ref={wrapRef}
        className="relative"
        style={{ height: `${items.length * 80}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container-x mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-3">Variety of Designs</p>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Minimal. Arabic. Bridal.
            </h2>
            <p className="text-muted mt-3 max-w-xl">
              Scroll through the gallery to see the range of styles.
            </p>
          </div>

          <div ref={trackRef} className="flex gap-6 px-6 md:px-10 will-change-transform">
            {items.map((m) => (
              <article
                key={m.url}
                className="card flex-shrink-0 w-[78vw] md:w-[440px] aspect-[3/4] overflow-hidden relative"
              >
                <img src={m.url} alt={m.alt} className="placeholder" />
                <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
                  <span className="tag-pill text-text bg-bg/60 backdrop-blur">{m.tag}</span>
                </div>
              </article>
            ))}
            <div className="flex-shrink-0 w-[10vw]" />
          </div>
        </div>
      </div>

      {/* Videos subsection */}
      <div id="designs-videos" className="py-20 px-6 md:px-10">
        <div className="container-x">
          <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Videos
          </motion.p>
          <motion.h3
            {...fade}
            transition={{ ...fade.transition, delay: 0.05 }}
            className="text-3xl md:text-4xl font-extrabold mb-2"
          >
            Videos
          </motion.h3>
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="text-muted mb-8 max-w-xl"
          >
            Process clips, reels and tutorials from the studio.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.15 }}
            className="card p-6 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
          >
            <div>
              <h4 className="text-xl md:text-2xl font-extrabold mb-2">More reels are on the way</h4>
              <p className="text-muted leading-relaxed max-w-lg">
                Meanwhile, follow along on YouTube and TikTok for full-length walkthroughs and
                behind-the-scenes clips.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@Henna.by.Rachana"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Watch on YouTube
              </a>
              <a
                href="https://www.tiktok.com/@henna_by_rachana"
                target="_blank"
                rel="noopener noreferrer"
                className="button btn-alt"
              >
                Follow on TikTok
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
