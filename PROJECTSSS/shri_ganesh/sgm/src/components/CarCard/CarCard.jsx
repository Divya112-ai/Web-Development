import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Fuel, Gauge, Calendar, ArrowRight } from 'lucide-react'
import styles from './CarCard.module.css'

function formatPrice(p) {
  if (p >= 100000) return `₹${(p / 100000).toFixed(2)} L`
  return `₹${p.toLocaleString('en-IN')}`
}

export default function CarCard({ car, index = 0 }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/cars/${car.id}`} className={styles.imageWrap}>
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay} />
        {car.featured && <span className={styles.badgeFeatured}>Featured</span>}
        <span className={styles.badgeFuel}>{car.fuel}</span>
      </Link>

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.brand}>{car.brand}</span>
          <span className={styles.year}>{car.year}</span>
        </div>
        <h3 className={styles.name}>{car.model}</h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Fuel size={12} /> {car.fuel}
          </span>
          <span className={styles.metaItem}>
            <Gauge size={12} /> {car.km.toLocaleString('en-IN')} km
          </span>
          <span className={styles.metaItem}>
            <Calendar size={12} /> {car.year}
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            {formatPrice(car.price)}
            <span className={styles.negotiable}>negotiable</span>
          </div>
          <Link to={`/cars/${car.id}`} className={styles.detailsBtn}>
            View <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
