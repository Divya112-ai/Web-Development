import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Stats.module.css'

const STATS = [
  { value: 500,  suffix: '+', label: 'Cars Sold',           icon: '🚗' },
  { value: 10,   suffix: '+', label: 'Years Experience',    icon: '🏆' },
  { value: 1000, suffix: '+', label: 'RTO Works Done',      icon: '📋' },
  { value: 95,   suffix: '%', label: 'Happy Customers',     icon: '⭐' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(value / 60)
    const id = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(id) }
      else setCount(start)
    }, 24)
    return () => clearInterval(id)
  }, [inView, value])

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

export default function Stats() {
  return (
    <section id="stats" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className={styles.icon}>{s.icon}</span>
              <span className={styles.num}>
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className={styles.label}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
