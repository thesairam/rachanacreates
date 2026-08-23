import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const items = [
  { url: '/media/designs/festive-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Festive henna mehndi design by Rachana, mehndi artist Netherlands', tag: 'Festive' },
  { url: '/media/designs/crystal-henna-gem-jewel-hand-body-art-rachana-amsterdam-netherlands.png', alt: 'Crystal henna gem jewel hand art by Rachana, Amsterdam Netherlands', tag: 'Crystal Henna' },
  { url: '/media/designs/luxury-full-arm-above-elbow-bridal-mehndi-rachana-amsterdam-netherlands.png', alt: 'Luxury full arm above elbow bridal mehndi by Rachana, Amsterdam Netherlands', tag: 'Luxury Bridal' },
  { url: '/media/designs/floral-rose-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Floral rose henna mehndi design by Rachana, henna artist Amsterdam Netherlands', tag: 'Floral' },
  { url: '/media/designs/rainbow-crystal-henna-gem-jewel-hand-body-art-rachana-amsterdam-netherlands.png', alt: 'Rainbow crystal henna gem jewel hand art by Rachana, LGBTQ friendly Amsterdam Netherlands', tag: 'Crystal Henna' },
  { url: '/media/designs/traditional-indian-full-hand-bridal-mehndi-rachana-amsterdam-netherlands.png', alt: 'Traditional Indian full hand bridal mehndi by Rachana, henna artist Amsterdam Netherlands', tag: 'Traditional Indian' },
  { url: '/media/designs/bridal-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Bridal mehndi design by Rachana, henna artist Amsterdam Netherlands', tag: 'Bridal' },
  { url: '/media/designs/geometric-indo-western-both-hands-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Geometric Indo-Western both hands henna mehndi by Rachana, Amsterdam Netherlands', tag: 'Indo-Western' },
  { url: '/media/designs/arabic-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Arabic henna mehndi design by Rachana, Amsterdam Netherlands', tag: 'Arabic' },
  { url: '/media/designs/floral-mandala-foot-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Floral mandala foot henna mehndi design by Rachana, Amsterdam Netherlands', tag: 'Feet' },
  { url: '/media/designs/yinyang-lotus-forearm-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Yin-yang lotus forearm henna mehndi design by Rachana, Amsterdam henna artist', tag: 'Custom' },
  { url: '/media/designs/minimal-sunflower-finger-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Minimal sunflower finger henna mehndi design by Rachana, Amsterdam', tag: 'Minimal' },
  { url: '/media/designs/lotus-yinyang-dreamcatcher-arm-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Lotus yin-yang dreamcatcher arm henna design by Rachana, LGBTQ friendly henna Amsterdam', tag: 'Custom' },
  { url: '/media/designs/indo-western-henna-mehndi-rachana-amsterdam-netherlands.png', alt: 'Indo-western henna mehndi design by Rachana, Netherlands', tag: 'Indo-Western' },
]

export default function DesignsScroll() {
  const { t } = useLanguage()
  const d = t.designs
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
    <section
      id="designs"
      ref={wrapRef}
      className="relative bg-bg2"
      style={{ height: `${items.length * 65}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-10 container-x mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-3">{d.galleryEyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">{d.galleryTitle}</h2>
          <p className="text-muted mt-3 max-w-xl">{d.gallerySubtitle}</p>
        </div>

        <div ref={trackRef} className="flex gap-6 px-6 md:px-10 will-change-transform">
          {items.map((m) => (
            <article
              key={m.url}
              className="card flex-shrink-0 w-[78vw] md:w-[440px] aspect-[3/4] overflow-hidden relative"
            >
              <img src={m.url} alt={m.alt} className="placeholder" />
              <div className="absolute left-4 bottom-4 right-4">
                <span className="tag-pill text-text bg-bg/60 backdrop-blur">{m.tag}</span>
              </div>
            </article>
          ))}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
      </div>
    </section>
  )
}
