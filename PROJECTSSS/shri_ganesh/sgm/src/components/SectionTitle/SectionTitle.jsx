import { motion } from 'framer-motion'
import styles from './SectionTitle.module.css'

export default function SectionTitle({ tag, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      className={`${styles.wrap} ${center ? styles.center : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      {tag && <span className={styles.tag}>{tag}</span>}
      <h2 className={`${styles.title} ${light ? styles.light : ''}`}>{title}</h2>
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
    </motion.div>
  )
}
