import { motion } from 'framer-motion'

const HEADLINE = 'Elegant Mehndi for Every Occasion'.split(' ')
const heroImg = '/media/designs/1.png'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 px-6 md:px-10">
      <div className="container-x w-full grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs tracking-[0.3em] uppercase text-muted mb-5"
          >
            Henna By Rachana · Studio
          </motion.p>

          <h1 className="font-extrabold leading-[1.05] text-[clamp(34px,5.2vw,64px)]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 + i * 0.07, ease: [0.2, 0.65, 0.3, 1] }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + HEADLINE.length * 0.07 }}
            className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed"
          >
            Modern, timeless mehndi designs for weddings, festivals, baby showers, sangeet
            and all special moments. Minimal to intricate — crafted with care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + HEADLINE.length * 0.07 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#designs" className="button">Explore Designs</a>
            <a href="#contact" className="button btn-alt">Book Now</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.65, 0.3, 1] }}
          className="md:col-span-5 card overflow-hidden aspect-[4/5]"
        >
          <img src={heroImg} alt="Featured mehndi design" className="placeholder" />
        </motion.div>
      </div>
    </section>
  )
}
