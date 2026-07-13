import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LegalModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 1] }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-[61] bg-bg border border-border rounded-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Legal information"
          >
            <div className="flex-shrink-0 bg-bg border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Legal</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-text transition-colors bg-transparent"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-sm text-muted leading-relaxed">

              {/* Business details */}
              <section>
                <h3 className="text-base font-extrabold text-text mb-3">Business details</h3>
                <p>Henna By Rachana</p>
                <p>KVK 42110227</p>
                <p>Amsterdam, Netherlands</p>
                <p>hennabyrachana@gmail.com</p>
              </section>

              {/* Terms & Conditions */}
              <section>
                <h3 className="text-base font-extrabold text-text mb-3">Terms &amp; Conditions</h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-text">1. Bookings</p>
                    <p>All bookings are confirmed only after written agreement (WhatsApp, email, or contact form). A booking is considered final once Henna By Rachana has confirmed availability and accepted the request.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">2. Pricing</p>
                    <p>All prices are listed in euros (€). A convenience fee covering travel time and travel costs will be added to the service price and communicated before booking confirmation. Prices may vary based on design complexity. BTW (VAT) will be added where applicable.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">3. Cancellation</p>
                    <p>Cancellations made less than 48 hours before the appointment may incur a cancellation fee. Henna By Rachana reserves the right to cancel in case of illness or unforeseen circumstances, in which case a full refund or rebooking will be offered.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">4. Payment</p>
                    <p>Payment is due on the day of the appointment unless otherwise agreed. Accepted methods will be communicated at the time of booking.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">5. Natural ingredients</p>
                    <p>All henna used is made from 100% natural ingredients. Clients with known skin sensitivities or allergies are advised to request a patch test before the appointment. Henna By Rachana is not liable for reactions caused by undisclosed allergies.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">6. Photos &amp; portfolio</p>
                    <p>Henna By Rachana may photograph completed work for use on the website and social media. Clients who prefer not to be photographed should inform the artist before the appointment.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-text">7. Applicable law</p>
                    <p>These terms are governed by Dutch law. Disputes will be submitted to the competent court in Amsterdam.</p>
                  </div>
                </div>
              </section>

              {/* Privacy */}
              <section>
                <h3 className="text-base font-extrabold text-text mb-3">Privacy</h3>
                <p>Personal data submitted via the contact form is processed solely to reply to your enquiry. Full details are in the privacy notice within the contact form. Data controller: Henna By Rachana, Amsterdam — hennabyrachana@gmail.com.</p>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
