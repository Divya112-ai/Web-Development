import { motion } from 'framer-motion'
import styles from './ServiceCard.module.css'

export default function ServiceCard({ icon, title, desc, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </motion.div>
  )
}
