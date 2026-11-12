import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

const PHONE    = '+919876543210'
const WA_NUM   = '919876543210'
const WA_MSG   = encodeURIComponent('Hello! I saw your website and I am interested. Please help me.')

const NAV_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'Cars',     to: '/cars'    },
  { label: 'Services', to: '/services'},
  { label: 'Sell Car', to: '/sell'    },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.glassy : ''}`}
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
            <span className={styles.logoIcon}>OM</span>
            <span className={styles.logoText}>
              <strong>Shri Ganesh Motors</strong>
              <em>Trusted Since 2013</em>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={styles.ctas}>
            <a href={`tel:${PHONE}`} className={styles.btnCall}>
              <Phone size={13} /> Call Now
            </a>
            <a
              href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`}
              target="_blank" rel="noreferrer"
              className={styles.btnWa}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={styles.burger}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `${styles.drawerLink} ${isActive ? styles.drawerActive : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <div className={styles.drawerCtas}>
              <a href={`tel:${PHONE}`} className={styles.btnCall} style={{ flex: 1, justifyContent: 'center' }}>
                <Phone size={13} /> Call Now
              </a>
              <a
                href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`}
                target="_blank" rel="noreferrer"
                className={styles.btnWa} style={{ flex: 1, justifyContent: 'center' }}
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
