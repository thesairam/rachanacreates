import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const faqs = [
  {
    lang: 'en',
    q: 'How do I book Rachana for my event or wedding?',
    a: 'You can book via the contact form on this website, WhatsApp (+31 64 922 2922), or Instagram (@henna.by.rachana). Share your event date, location, and the service you need and Rachana will confirm availability.',
  },
  {
    lang: 'nl',
    q: 'Hoe boek ik een henna artiest in Amsterdam?',
    a: 'Neem contact op via het contactformulier, WhatsApp (+31 64 922 2922) of Instagram. Vermeld je evenementdatum, locatie en gewenste service. Rachana is beschikbaar in Amsterdam, Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen en heel Nederland.',
  },
  {
    lang: 'en',
    q: 'What henna styles does Rachana offer?',
    a: 'Rachana offers bridal henna (bruidsmehndi), Arabic henna, Indo-Western henna, festive henna, floral designs, custom designs, and minimal henna. All using 100% natural ingredients.',
  },
  {
    lang: 'nl',
    q: 'Welke henna stijlen biedt Rachana aan?',
    a: 'Rachana biedt bruidsmehndi, Arabische henna, Indo-westerse henna, feesthenna, bloemendesigns, op maat gemaakte designs en minimale henna. Alles met 100% natuurlijke ingrediënten.',
  },
  {
    lang: 'en',
    q: 'How long does henna last?',
    a: 'Natural henna typically lasts 1–3 weeks depending on skin type, aftercare, and the area applied. Hands and feet stain deepest and last longest. Avoid soaking in water and use coconut or olive oil to extend the design.',
  },
  {
    lang: 'nl',
    q: 'Hoe lang blijft henna zitten?',
    a: 'Natuurlijke henna blijft meestal 1 tot 3 weken zitten, afhankelijk van het huidtype, de verzorging en het aangebrachte gebied. Handen en voeten kleuren het diepst en duren het langst. Vermijd weken in water en gebruik kokosolie of olijfolie om het design te verlengen.',
  },
  {
    lang: 'en',
    q: 'Is henna safe for children?',
    a: 'Yes — Rachana uses 100% natural henna made from plant-based ingredients with no chemicals or additives. It is safe for adults and children. Clients with known skin sensitivities are advised to request a patch test in advance.',
  },
  {
    lang: 'nl',
    q: 'Is henna veilig voor kinderen?',
    a: 'Ja — Rachana gebruikt 100% natuurlijke henna van plantaardige ingrediënten zonder chemicaliën of toevoegingen. Het is veilig voor volwassenen en kinderen. Klanten met bekende huidgevoeligheden wordt aangeraden vooraf een huidtest aan te vragen.',
  },
  {
    lang: 'en',
    q: 'How much does bridal henna cost in Amsterdam?',
    a: 'Bridal henna (Luxury package) starts from €450 for both hands above elbow length plus minimal designs on both legs. The Mini package starts from €150. Prices exclude travel convenience fee. Contact for a personalised quote.',
  },
  {
    lang: 'nl',
    q: 'Wat kost bruidshenna in Amsterdam?',
    a: 'Bruidsmehndi (Luxury pakket) begint vanaf €450 voor beide handen boven de elleboog plus minimale designs op de benen. Mini pakket vanaf €150. Prijzen zijn exclusief reiskosten (convenience fee). Neem contact op voor een offerte op maat.',
  },
  {
    lang: 'en',
    q: 'Does Rachana travel outside Amsterdam?',
    a: 'Yes. Rachana serves clients across the Netherlands including Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen, Haarlem, Leiden, Breda, Tilburg, Groningen, and beyond. A convenience fee covering travel time and costs is added to the service price.',
  },
  {
    lang: 'nl',
    q: 'Reist Rachana ook buiten Amsterdam?',
    a: 'Ja! Rachana reist naar Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen, Haarlem, Leiden, Breda, Tilburg, Groningen en alle andere steden in Nederland. Er wordt een reiskostenvergoeding (convenience fee) toegevoegd op basis van de locatie.',
  },
  {
    lang: 'en',
    q: 'Does Rachana do workshops?',
    a: 'Yes! Rachana organises henna workshops for corporate events, birthdays, schools and other gatherings in Amsterdam and across the Netherlands. Contact for availability and pricing (minimum 2 hours at €65/hr).',
  },
  {
    lang: 'nl',
    q: 'Doet Rachana ook workshops?',
    a: 'Ja! Rachana verzorgt henna workshops voor bedrijfsuitjes, verjaardagen, scholen en andere evenementen in Amsterdam en heel Nederland. Neem contact op voor meer informatie en beschikbaarheid (minimaal 2 uur à €65/uur).',
  },
  {
    lang: 'en',
    q: 'What is the difference between henna and mehndi?',
    a: 'Henna and mehndi are the same art — "mehndi" is the Hindi/Urdu word for henna. Both refer to the natural plant-based dye used to create temporary designs on the skin, traditionally applied at weddings, festivals, and celebrations.',
  },
  {
    lang: 'nl',
    q: 'Wat is het verschil tussen henna en mehndi?',
    a: 'Henna en mehndi zijn hetzelfde — "mehndi" is het Hindi/Urdu woord voor henna. Beide verwijzen naar de plantaardige verf die wordt gebruikt voor tijdelijke tatoeages op de huid, traditioneel toegepast bij bruiloften en feesten.',
  },
  {
    lang: 'en',
    q: 'Is Rachana LGBTQ+ friendly? Do you do same-sex weddings?',
    a: 'Absolutely. Rachana warmly welcomes all clients regardless of gender, sexuality, or background. Henna is for everyone — bridal mehndi for same-sex couples, pride events, and LGBTQ+ celebrations are all welcome. Amsterdam Pride and all events are covered.',
  },
  {
    lang: 'nl',
    q: 'Is Rachana LGBTQ+ vriendelijk? Doe je ook same-sex bruiloften?',
    a: 'Ja, absoluut! Rachana verwelkomt alle klanten ongeacht geslacht, seksualiteit of achtergrond. Bruidsmehndi voor same-sex koppels, Pride Amsterdam, regenboog evenementen en queer bruiloften zijn van harte welkom.',
  },
  {
    lang: 'en',
    q: 'Can I get bridal henna in Rotterdam, Den Haag or Utrecht?',
    a: 'Yes — Rachana travels to Rotterdam, Den Haag (The Hague), Utrecht, Eindhoven, Amstelveen, Haarlem, Breda, Tilburg, Groningen and all cities across the Netherlands. A travel convenience fee applies based on your location.',
  },
  {
    lang: 'nl',
    q: 'Bruidsmehndi in Rotterdam, Den Haag of Utrecht — kan dat?',
    a: 'Ja! Rachana reist naar Rotterdam, Den Haag, Utrecht, Eindhoven, Amstelveen, Haarlem, Breda, Tilburg, Groningen en alle andere steden in Nederland. Er wordt een reiskostenvergoeding toegevoegd op basis van de locatie.',
  },
  {
    lang: 'en',
    q: 'Can I get henna for an Indian or Pakistani wedding in the Netherlands?',
    a: 'Yes! Rachana specialises in traditional Indian bridal mehndi (mehndi raat / sangeet) with over 20 years of experience. Full bridal sets as well as guest henna for the mehndi evening are available across the Netherlands.',
  },
  {
    lang: 'nl',
    q: 'Henna voor Indiase of Pakistaanse bruiloft in Nederland?',
    a: 'Ja! Rachana is gespecialiseerd in traditionele Indiase bruidsmehndi (mehndi raat / sangeet) met meer dan 20 jaar ervaring. Zowel volledige bruidssets als gast-henna voor de mehndi avond zijn mogelijk door heel Nederland.',
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
        onClick={() => setOpen((v) => !v)}
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
  const { lang, t } = useLanguage()
  const f = t.faq
  const filtered = faqs.filter((item) => item.lang === lang)

  return (
    <section id="faq" className="relative py-24 px-6 md:px-10">
      <div className="container-x">
        <motion.p {...fade} className="text-xs tracking-[0.3em] uppercase text-muted mb-3">
          {f.eyebrow}
        </motion.p>
        <motion.h2 {...fade} transition={{ ...fade.transition, delay: 0.05 }} className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
          {f.h2}
        </motion.h2>
        <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="text-muted mb-10 max-w-xl">
          {f.subtitle}
        </motion.p>

        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }} className="card p-6 md:p-8">
          {filtered.map((item) => (
            <Item key={item.q} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
