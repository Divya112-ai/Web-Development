import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './Services.module.css'

const SERVICES = [
  {
    icon: '🚗',
    title: 'Used Car Sale',
    short: 'Buy your next car from our verified inventory.',
    desc: 'Browse our handpicked, thoroughly inspected inventory of quality pre-owned vehicles. Every car comes with full documentation, service history, and transparent pricing. No hidden charges, no pressure — just honest deals.',
    points: ['50-point vehicle inspection', 'Full service history', 'Clear title guarantee', 'Test drives available', 'Negotiable pricing'],
    cta: { label: 'Browse Cars', to: '/cars' },
  },
  {
    icon: '💰',
    title: 'Used Car Purchase',
    short: 'We buy your car at the best market price.',
    desc: 'Ready to sell your car? We offer fair, market-based evaluations and instant payment. No haggling, no delays. Share your car details and we\'ll call you within 2 hours with a quote.',
    points: ['Free evaluation', 'Best market price', 'Instant payment', 'We handle paperwork', 'All brands accepted'],
    cta: { label: 'Sell Your Car', to: '/sell' },
  },
  {
    icon: '🤝',
    title: 'Auto Consultancy',
    short: 'Expert advice for all your automobile decisions.',
    desc: 'Not sure what car to buy? Need guidance on pricing, financing, or the right choice for your needs? Our experienced consultants provide personalized advice based on your budget and requirements.',
    points: ['Budget planning', 'Car selection guidance', 'Market price advice', 'Loan & EMI help', 'Insurance guidance'],
    cta: { label: 'Contact Us', to: '/contact' },
  },
  {
    icon: '📋',
    title: 'RTO Work',
    short: 'All RTO documentation handled professionally.',
    desc: 'We handle all types of RTO work quickly and accurately. From registration renewals to NOC applications — leave the paperwork to us and avoid long queues and confusing procedures.',
    points: ['Vehicle registration', 'Ownership transfer', 'NOC application', 'Hypothecation removal', 'Address change'],
    cta: { label: 'Enquire Now', to: '/contact' },
  },
  {
    icon: '🔄',
    title: 'RC Transfer',
    short: 'Fast and hassle-free RC transfer service.',
    desc: 'RC transfer made simple. Whether you\'re buying or selling, we ensure a legally compliant and swift transfer of ownership. We handle the entire process from form submission to delivery.',
    points: ['Form 29/30 preparation', 'Document verification', 'Online & offline filing', 'Status tracking', 'Door-step service'],
    cta: { label: 'Get Help', to: '/contact' },
  },
  {
    icon: '🛡️',
    title: 'Insurance Assistance',
    short: 'Get the best insurance coverage at best rates.',
    desc: 'Navigate insurance with ease. We compare policies from top providers and help you get the best coverage for your vehicle at the most competitive premium. New policy, renewal, or claim support.',
    points: ['Policy comparison', 'Best premium rates', 'Renewal reminders', 'Claim assistance', 'Zero-dep options'],
    cta: { label: 'Get a Quote', to: '/contact' },
  },
]

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={styles.tag}>What We Offer</span>
            <h1 className={styles.h1}>Our <em>Services</em></h1>
            <p className={styles.sub}>Complete automobile solutions — all under one trusted roof in Ahmedabad.</p>
          </motion.div>
        </div>
      </div>

      {/* Service Cards */}
      <div className={styles.body}>
        <div className="container">
          <div className={styles.grid}>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon}>{s.icon}</div>
                  <div>
                    <h2 className={styles.cardTitle}>{s.title}</h2>
                    <p className={styles.cardShort}>{s.short}</p>
                  </div>
                </div>
                <p className={styles.cardDesc}>{s.desc}</p>
                <ul className={styles.points}>
                  {s.points.map(p => <li key={p}><span className={styles.check}>✓</span>{p}</li>)}
                </ul>
                <Link to={s.cta.to} className={styles.cardBtn}>
                  {s.cta.label} <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>Not Sure What You Need?</h3>
              <p className={styles.ctaSub}>Just give us a call or WhatsApp — we'll guide you to the right solution.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href="tel:+919876543210" className={styles.btnOutline}>📞 Call Now</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className={styles.btnWa}>💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
