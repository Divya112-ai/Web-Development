import { Link } from 'react-router-dom'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import styles from './Footer.module.css'

const WA = '919876543210'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>OM</span>
            <span className={styles.logoText}>
              <strong>Shri Ganesh Motors</strong>
              <em>Trusted Since 2013</em>
            </span>
          </div>
          <p className={styles.desc}>
            Your trusted destination for quality used cars, RTO work, and complete
            automobile solutions in Ahmedabad, Gujarat.
          </p>
          <div className={styles.socials}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className={styles.social} aria-label="WhatsApp">
              <MessageCircle size={16} />
            </a>
            <a href="tel:+919876543210" className={styles.social} aria-label="Phone">
              <Phone size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <nav className={styles.colLinks}>
            {[
              ['Home', '/'],
              ['Cars', '/cars'],
              ['Services', '/services'],
              ['Sell Car', '/sell'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <Link key={to} to={to} className={styles.colLink}>{label}</Link>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Our Services</h4>
          <nav className={styles.colLinks}>
            {[
              'Used Car Sale',
              'Used Car Purchase',
              'RTO Work',
              'RC Transfer',
              'Insurance Assistance',
              'Auto Consultancy',
            ].map(s => <span key={s} className={styles.colLink}>{s}</span>)}
          </nav>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <MapPin size={14} className={styles.contactIcon} />
              <span>Near RTO Office, Naroda Road,<br />Ahmedabad, Gujarat – 382330</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={14} className={styles.contactIcon} />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
            <div className={styles.contactItem}>
              <MessageCircle size={14} className={styles.contactIcon} />
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp Us</a>
            </div>
            <div className={styles.contactItem}>
              <Clock size={14} className={styles.contactIcon} />
              <span>Mon – Sat: 9 AM – 7 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span>© {new Date().getFullYear()} Shri Ganesh Motors. All rights reserved.</span>
            <span>Ahmedabad, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
