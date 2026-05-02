import { useEffect, useRef } from 'react'

const items = [
  { url: '/media/designs/1.png', alt: 'Design 1', tag: 'Bridal' },
  { url: '/media/designs/2.png', alt: 'Design 2', tag: 'Arabic' },
  { url: '/media/designs/3.png', alt: 'Design 3', tag: 'Indo-Western' },
  { url: '/media/designs/4.png', alt: 'Design 4', tag: 'Festive' }
]

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
    <section
      id="designs"
      ref={wrapRef}
      className="relative bg-bg2"
      style={{ height: `${items.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-x mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-3">Variety of Designs</p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Minimal. Arabic. Bridal.
          </h2>
          <p className="text-muted mt-3 max-w-xl">
            Scroll to glide through the gallery — every piece crafted to suit the moment.
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
    </section>
  )
}
