import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How do I book Rachana for my event or wedding?',
    a: 'You can book via the contact form on this website, WhatsApp (+31 64 922 2922), or Instagram (@henna.by.rachana). Share your event date, location, and the service you need and Rachana will confirm availability.'
  },
  {
    q: 'Hoe boek ik een henna artiest in Amsterdam? (How do I book a henna artist in Amsterdam?)',
    a: 'Neem contact op via het contactformulier, WhatsApp (+31 64 922 2922) of Instagram. Vermeld je evenementdatum, locatie en gewenste service. Rachana is beschikbaar in Amsterdam, Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen en heel Nederland.'
  },
  {
    q: 'What henna styles does Rachana offer?',
    a: 'Rachana offers bridal henna (bruidsmehndi), Arabic henna, Indo-Western henna, festive henna, floral designs, custom designs, and minimal henna. All using 100% natural ingredients.'
  },
  {
    q: 'How long does henna last? / Hoe lang blijft henna zitten?',
    a: 'Natural henna typically lasts 1–3 weeks depending on skin type, aftercare, and the area applied. Hands and feet stain deepest and last longest. Avoid soaking in water and use coconut or olive oil to extend the design.'
  },
  {
    q: 'Is henna safe? Is it safe for children? / Is henna veilig voor kinderen?',
    a: 'Yes — Rachana uses 100% natural henna made from plant-based ingredients with no chemicals or additives. It is safe for adults and children. Clients with known skin sensitivities are advised to request a patch test in advance.'
  },
  {
    q: 'Wat kost bruidshenna in Amsterdam? (How much does bridal henna cost in Amsterdam?)',
    a: 'Bruidsmehndi begint vanaf €350 voor beide handen tot boven de elleboog plus minimale designs op de benen. Standaard service vanaf €150. Prijzen zijn exclusief reiskosten (convenience fee). Neem contact op voor een offerte op maat.'
  },
  {
    q: 'Does Rachana travel outside Amsterdam?',
    a: 'Yes. Rachana serves clients across the Netherlands including Rotterdam, Den Haag (The Hague), Utrecht, Eindhoven, Amstelveen, Haarlem, Leiden, Breda, Tilburg, Groningen, and beyond. A convenience fee covering travel time and costs is added to the service price.'
  },
  {
    q: 'Doet Rachana ook workshops? (Does Rachana do workshops?)',
    a: 'Ja! Rachana verzorgt henna workshops voor bedrijfsuitjes, verjaardagen, scholen en andere evenementen in Amsterdam en heel Nederland. Neem contact op voor meer informatie en beschikbaarheid.'
  },
  {
    q: 'What is the difference between henna and mehndi?',
    a: 'Henna and mehndi are the same art — "mehndi" is the Hindi/Urdu word for henna. Both refer to the natural plant-based dye used to create temporary designs on the skin, traditionally applied at weddings, festivals, and celebrations.'
  },
  {
    q: 'Wat is het verschil tussen henna en mehndi? (What is the difference between henna and mehndi?)',
    a: 'Henna en mehndi zijn hetzelfde — "mehndi" is het Hindi/Urdu woord voor henna. Beide verwijzen naar de plantaardige verf die wordt gebruikt voor tijdelijke tatoeages op de huid, traditioneel toegepast bij bruiloften en feesten.'
  },
  {
    q: 'Is Rachana LGBTQ+ friendly? Do you do same-sex weddings?',
    a: 'Absolutely. Rachana warmly welcomes all clients regardless of gender, sexuality, or background. Henna is for everyone — bridal mehndi for same-sex couples, pride events, and LGBTQ+ celebrations are all welcome. Amsterdam Pride and all events are covered.'
  },
  {
    q: 'Doet Rachana ook henna voor LGBTQ+ bruiloften en Pride Amsterdam?',
    a: 'Ja, absoluut! Rachana is LGBTQ+ vriendelijk en verwelkomt alle klanten. Bruidsmehndi voor same-sex koppels, Pride Amsterdam, regenboog evenementen en queer bruiloften zijn van harte welkom.'
  },
  {
    q: 'Bruidsmehndi in Rotterdam, Den Haag of Utrecht — kan dat?',
    a: 'Ja! Rachana reist naar Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen, Haarlem, Breda, Tilburg, Groningen en alle andere steden in Nederland. Er wordt een reiskostenvergoeding (convenience fee) toegevoegd op basis van de locatie.'
  },
  {
    q: 'Can I get bridal henna in Rotterdam, Den Haag or Utrecht?',
    a: 'Yes — Rachana travels to Rotterdam, Den Haag (The Hague), Utrecht, Eindhoven, Amstelveen, Haarlem, Breda, Tilburg, Groningen and all cities across the Netherlands. A travel convenience fee applies based on your location.'
  },
  {
    q: 'Henna voor Indiaase of Pakistaanse bruiloft in Nederland?',
    a: 'Ja! Rachana is gespecialiseerd in traditionele Indiase bruidsmehndi (mehndi raat / sangeet) en heeft meer dan 20 jaar ervaring. Zowel volledige bruidssets als gast-henna voor de mehndi avond zijn mogelijk door heel Nederland.'
  },
]

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 }
}

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left flex items-center justify-between gap-4 py-4 bg-transparent border-0 cursor-pointer text-text font-semibold leading-snug"
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={`flex-shrink-0 w-5 h-5 text-muted transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>✛</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-muted leading-relaxed pb-4 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          FAQ · Veelgestelde vragen
        </motion.p>
        <motion.h2
          {...fade}
          transition={{ ...fade.transition, delay: 0.05 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-2"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className="text-muted mb-10 max-w-xl"
        >
          Everything you need to know about booking henna in Amsterdam and across the Netherlands — in English and Dutch.
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.15 }}
          className="card p-6 md:p-8"
        >
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
