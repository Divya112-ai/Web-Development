import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import styles from './Contact.module.css'

const WA = '919876543210'

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', subject:'general', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={styles.tag}>Get In Touch</span>
            <h1 className={styles.h1}>Visit Our <em>Showroom</em></h1>
            <p className={styles.sub}>We'd love to meet you. Come visit or send us a message — we're here to help.</p>
          </motion.div>
        </div>
      </div>

      <div className={styles.body}>
        <div className="container">
          <div className={styles.layout}>
            {/* Left: Info */}
            <motion.div className={styles.info} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><MapPin size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Address</div>
                    <div className={styles.infoValue}>Near RTO Office, Naroda Road,<br />Ahmedabad, Gujarat – 382330</div>
                  </div>
                </div>
                <a href="tel:+919876543210" className={`${styles.infoCard} ${styles.infoCardLink}`}>
                  <div className={styles.infoIcon}><Phone size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Phone</div>
                    <div className={styles.infoValue}>+91 98765 43210</div>
                  </div>
                </a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className={`${styles.infoCard} ${styles.infoCardWa}`}>
                  <div className={`${styles.infoIcon} ${styles.infoIconGreen}`}><MessageCircle size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>WhatsApp</div>
                    <div className={`${styles.infoValue} ${styles.infoValueGreen}`}>+91 98765 43210 — Chat Now</div>
                  </div>
                </a>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><Clock size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Working Hours</div>
                    <div className={styles.infoValue}>Monday – Saturday: 9:00 AM – 7:00 PM<br /><span className={styles.dim}>Sunday: By appointment only</span></div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className={styles.map}>
                <div className={styles.mapInner}>
                  <span>🗺️</span>
                  <div className={styles.mapTitle}>Shri Ganesh Motors</div>
                  <div className={styles.mapSub}>Near RTO Office, Naroda Road, Ahmedabad</div>
                  <a
                    href="https://maps.google.com/?q=RTO+Office+Naroda+Road+Ahmedabad"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.mapLink}
                  >
                    Open in Google Maps <ArrowRight size={13} />
                  </a>
                </div>
                {/* In production: replace with <iframe src="https://maps.google.com/maps?q=...&output=embed" /> */}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {submitted ? (
                <div className={styles.success}>
                  <CheckCircle size={48} className={styles.successIcon} />
                  <h3>Message Sent!</h3>
                  <p>Thank you, <strong>{form.name}</strong>! We've received your message and will get back to you within 2 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',subject:'general',message:'' }) }} className={styles.btnPrimary}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form}>
                  <div className={styles.formHeader}>
                    <h3>Send a Message</h3>
                    <p>We reply within 2 hours during working hours</p>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label>Full Name *</label>
                      <input type="text" placeholder="Rajesh Patel" value={form.name} onChange={set('name')} required />
                    </div>
                    <div className={styles.field}>
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} required />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Subject</label>
                    <select value={form.subject} onChange={set('subject')}>
                      <option value="general">General Enquiry</option>
                      <option value="buying">Buying a Car</option>
                      <option value="selling">Selling My Car</option>
                      <option value="rto">RTO Work</option>
                      <option value="rc">RC Transfer</option>
                      <option value="insurance">Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Message *</label>
                    <textarea placeholder="How can we help you?" value={form.message} onChange={set('message')} rows={5} required />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Sending…' : <> Send Message <ArrowRight size={14} /> </>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
