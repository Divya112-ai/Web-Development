import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ChevronDown } from 'lucide-react'
import { toast } from "react-hot-toast"
import { useAdmin } from "../../context/AdminContext"
import styles from './Hero.module.css'

const WA = '919876543210'

export default function Hero() {
  const { addInquiry } = useAdmin()
  const [form, setForm] = useState({ name: '', phone: '', interest: 'buying' })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    addInquiry({ name: form.name, phone: form.phone, interest: form.interest, message: '' })
    toast.success("Inquiry submitted! We'll call you within 2 hours.")
    setForm({ name: '', phone: '', interest: 'buying' })
    setLoading(false)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.bgImg} />
        <div className={styles.bgOverlay} />
        <div className={styles.bgGlow} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Left */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.dot} />
            Gujarat's Trusted Dealership · Est. 2013
          </motion.span>

          <motion.h1
            className={styles.h1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Your Trusted<br />
            <span>Destination</span> for<br />
            Quality Used Cars
          </motion.h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Buy, Sell and Exchange Cars with Complete RTO Assistance.
            Trusted by 500+ families across Ahmedabad &amp; Gujarat.
          </motion.p>

          <motion.div
            className={styles.btns}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link to="/cars" className={styles.btnPrimary}>
              View Cars <ArrowRight size={15} />
            </Link>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank" rel="noreferrer"
              className={styles.btnWa}
            >
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div
            className={styles.pills}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {['500+ Cars Sold', 'Verified Vehicles', 'Fast RTO Work', '10+ Years Trust'].map(t => (
              <span key={t} className={styles.pill}>{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right – Inquiry Card */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: 'easeOut' }}
        >
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3>Quick Inquiry</h3>
              <p>Free consultation · Reply within 2 hours</p>
            </div>
            <form onSubmit={submit} className={styles.form}>
              <div className={styles.field}>
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Rajesh Patel"
                  value={form.name}
                  onChange={set('name')}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={form.phone}
                  onChange={set('phone')}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>I'm Interested In</label>
                <select value={form.interest} onChange={set('interest')}>
                  <option value="buying">Buying a Car</option>
                  <option value="selling">Selling My Car</option>
                  <option value="rto">RTO Work</option>
                  <option value="rc">RC Transfer</option>
                  <option value="insurance">Insurance Assistance</option>
                  <option value="consultation">Auto Consultancy</option>
                </select>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Submitting…' : <>Submit Inquiry <ArrowRight size={14} /></>}
              </button>
            </form>
            <div className={styles.cardFoot}>
              <a href="tel:+919876543210"><Phone size={12} /> Or call us directly</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#stats"
        className={styles.scroll}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </motion.a>
    </section>
  )
}
