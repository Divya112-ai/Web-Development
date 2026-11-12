import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, MessageCircle, Fuel, Gauge, Calendar, Users, Palette, Settings } from 'lucide-react'
import InquiryForm from '../../components/InquiryForm/InquiryForm'
import { cars } from '../../data/cars'
import styles from './CarDetail.module.css'

const WA_NUM = '919876543210'

function formatPrice(p) {
  return p >= 100000 ? `₹${(p / 100000).toFixed(2)} Lakh` : `₹${p.toLocaleString('en-IN')}`
}

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(c => c.id === Number(id))
  const [activeImg, setActiveImg] = useState(0)

  if (!car) return (
    <div className={styles.notFound}>
      <h2>Car not found</h2>
      <Link to="/cars" className={styles.backLink}>← Back to Cars</Link>
    </div>
  )

  const waMsg = encodeURIComponent(`Hi! I'm interested in the ${car.brand} ${car.model} (${car.year}) listed on your website. Please share more details.`)

  const specs = [
    { icon: <Calendar size={15} />, label: 'Year',          value: car.year },
    { icon: <Fuel     size={15} />, label: 'Fuel Type',     value: car.fuel },
    { icon: <Gauge    size={15} />, label: 'KM Driven',     value: `${car.km.toLocaleString('en-IN')} km` },
    { icon: <Settings size={15} />, label: 'Transmission',  value: car.transmission },
    { icon: <Users    size={15} />, label: 'Owners',        value: car.owners },
    { icon: <Palette  size={15} />, label: 'Colour',        value: car.color },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <button onClick={() => navigate(-1)} className={styles.back}>
            <ArrowLeft size={15} /> Back to Cars
          </button>
          <span className={styles.breadSep}>/</span>
          <span className={styles.breadCurrent}>{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Left */}
          <div className={styles.left}>
            {/* Gallery */}
            <motion.div className={styles.gallery} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className={styles.mainImg}>
                <img src={car.images[activeImg]} alt={`${car.brand} ${car.model}`} />
                <span className={styles.imgCount}>{activeImg + 1} / {car.images.length}</span>
              </div>
              {car.images.length > 1 && (
                <div className={styles.thumbs}>
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`View ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Features */}
            <motion.div className={styles.featuresCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              <h4 className={styles.featuresTitle}>Key Features</h4>
              <div className={styles.features}>
                {car.features.map(f => (
                  <span key={f} className={styles.feature}>✓ {f}</span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div className={styles.descCard} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h4 className={styles.featuresTitle}>About This Car</h4>
              <p className={styles.desc}>{car.description}</p>
            </motion.div>
          </div>

          {/* Right */}
          <div className={styles.right}>
            <motion.div className={styles.infoCard} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <div className={styles.brand}>{car.brand}</div>
              <h1 className={styles.name}>{car.model}</h1>
              <div className={styles.price}>{formatPrice(car.price)}<span> negotiable</span></div>

              <div className={styles.specs}>
                {specs.map(s => (
                  <div key={s.label} className={styles.spec}>
                    <span className={styles.specIcon}>{s.icon}</span>
                    <div>
                      <div className={styles.specLabel}>{s.label}</div>
                      <div className={styles.specValue}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.verified}>
                <span>✅</span>
                <div>
                  <div className={styles.verifiedTitle}>Verified Vehicle</div>
                  <div className={styles.verifiedSub}>50-point inspection · Clean title · No accidents</div>
                </div>
              </div>

              <div className={styles.ctaBtns}>
                <a
                  href={`https://wa.me/${WA_NUM}?text=${waMsg}`}
                  target="_blank" rel="noreferrer"
                  className={styles.btnWa}
                >
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>
                <a href="tel:+919876543210" className={styles.btnCall}>
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </motion.div>

            {/* Inquiry form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <InquiryForm carName={`${car.brand} ${car.model} ${car.year}`} />
            </motion.div>
          </div>
        </div>

        {/* Related Cars */}
        <RelatedCars current={car} />
      </div>
    </motion.div>
  )
}

function RelatedCars({ current }) {
  const related = cars.filter(c => c.id !== current.id && (c.brand === current.brand || c.fuel === current.fuel)).slice(0, 3)
  if (!related.length) return null
  return (
    <div className={styles.related}>
      <h3 className={styles.relatedTitle}>You Might Also Like</h3>
      <div className={styles.relatedGrid}>
        {related.map(car => {
          const price = car.price >= 100000 ? `₹${(car.price / 100000).toFixed(2)}L` : `₹${car.price.toLocaleString('en-IN')}`
          return (
            <Link key={car.id} to={`/cars/${car.id}`} className={styles.relatedCard}>
              <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className={styles.relatedImg} />
              <div className={styles.relatedInfo}>
                <div className={styles.relatedName}>{car.brand} {car.model}</div>
                <div className={styles.relatedMeta}>{car.year} · {car.fuel} · {car.km.toLocaleString('en-IN')} km</div>
                <div className={styles.relatedPrice}>{price}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
