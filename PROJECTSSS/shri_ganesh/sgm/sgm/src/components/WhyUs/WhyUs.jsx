import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle/SectionTitle'
import styles from './WhyUs.module.css'

const ITEMS = [
  { icon: '✅', title: 'Verified Vehicles',       desc: 'Every car goes through a thorough 50-point inspection before listing. No hidden surprises.' },
  { icon: '📑', title: 'Transparent Documentation', desc: 'Full history, clean titles, and clear paperwork on every deal. Zero hidden charges.' },
  { icon: '⚡', title: 'Fast RTO Processing',      desc: 'Quick turnaround on all RTO and RC transfer work. We handle all paperwork.' },
  { icon: '🏆', title: '10+ Years Experience',     desc: 'Trusted by 500+ families. Deep expertise in the Ahmedabad automobile market.' },
  { icon: '💬', title: 'After-Sale Support',        desc: 'Our relationship doesn\'t end at the sale. We are always here for any help.' },
  { icon: '💎', title: 'Best Market Price',         desc: 'Competitive pricing with a fair evaluation. You get the best deal, guaranteed.' },
]

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          tag="Why Trust Us"
          title="Why Choose Shri Ganesh Motors?"
          subtitle="We've built our reputation on transparency, trust, and exceptional service."
          center
        />
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.text}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
