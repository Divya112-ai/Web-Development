import { motion } from 'framer-motion'
import styles from './TestimonialCard.module.css'

export default function TestimonialCard({ name, city, text, rating = 5, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
    >
      <div className={styles.stars}>{'★'.repeat(rating)}</div>
      <blockquote className={styles.text}>"{text}"</blockquote>
      <div className={styles.author}>
        <div className={styles.avatar}>
          {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.city}>{city}</div>
        </div>
      </div>
    </motion.div>
  )
}
