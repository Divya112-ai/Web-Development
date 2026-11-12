import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../../components/Hero/Hero'
import Stats from '../../components/Stats/Stats'
import CarCard from '../../components/CarCard/CarCard'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import WhyUs from '../../components/WhyUs/WhyUs'
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { cars } from '../../data/cars'
import styles from './Home.module.css'

const SERVICES = [
  { icon: '🚗', title: 'Used Car Sale',         desc: 'Browse our verified inventory of quality pre-owned vehicles at transparent, fair prices.' },
  { icon: '💰', title: 'Used Car Purchase',      desc: 'We buy your car at the best market price with instant evaluation and quick payment.' },
  { icon: '🤝', title: 'Auto Consultancy',       desc: 'Expert advice on buying, selling, pricing, and all your automobile-related decisions.' },
  { icon: '📋', title: 'RTO Work',               desc: 'Complete RTO documentation handled professionally — fast, accurate, and stress-free.' },
  { icon: '🔄', title: 'RC Transfer',            desc: 'Hassle-free RC transfer with complete legal documentation and follow-up support.' },
  { icon: '🛡️', title: 'Insurance Assistance',  desc: 'Get the best insurance deals and renewals with our expert guidance and partnerships.' },
]

const TESTIMONIALS = [
  { name: 'Rajesh Patel',   city: 'Ahmedabad', rating: 5, text: 'Bought my Creta here and the experience was exceptional. Full transparency, no pressure, and the car was exactly as described. Highly recommend!' },
  { name: 'Suresh Mehta',   city: 'Gandhinagar', rating: 5, text: 'RTO work done in just 3 days! Usually takes weeks. Shri Ganesh Motors is my go-to for all automobile needs. Excellent service.' },
  { name: 'Priya Desai',    city: 'Surat', rating: 5, text: 'Got a very fair price for my old Swift. The process was smooth and they handled all the paperwork. Will definitely come back!' },
  { name: 'Amit Shah',      city: 'Ahmedabad', rating: 5, text: 'Bought Innova Crysta for our family. The team was honest about everything — history, condition, pricing. Trust is everything and they delivered.' },
  { name: 'Kavita Nair',    city: 'Vadodara', rating: 5, text: 'Insurance assistance was so helpful. They found me a better policy than what I had before at a lower premium. Amazing team!' },
  { name: 'Deepak Sharma',  city: 'Ahmedabad', rating: 5, text: 'RC transfer handled quickly with zero hassle. These guys know their work inside out. Truly professional dealership.' },
]

const featured = cars.filter(c => c.featured).slice(0, 6)

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Hero />
      <Stats />

      {/* Featured Cars */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <SectionTitle tag="Our Inventory" title={<>Featured <em>Cars</em></>} subtitle="Handpicked, verified vehicles — ready for their new home." />
            <Link to="/cars" className={styles.viewAll}>View All Cars <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.carsGrid}>
            {featured.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          </div>
          <div className={styles.centerBtn}>
            <Link to="/cars" className={styles.btnPrimary}>Browse Full Inventory <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className="container">
          <SectionTitle tag="What We Offer" title={<>Our <em>Services</em></>} subtitle="End-to-end automobile solutions — all under one roof." center />
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Sell CTA Banner */}
      <section className={styles.sellBanner}>
        <div className="container">
          <div className={styles.sellInner}>
            <div className={styles.sellLeft}>
              <span className={styles.tag}>Sell Your Car</span>
              <h2 className={styles.sellTitle}>Get the Best Price<br />for Your Car</h2>
              <p className={styles.sellSub}>Free evaluation · Fair price · Zero hassle · Quick payment. We buy all brands and models.</p>
              <Link to="/sell" className={styles.btnPrimary}>Sell My Car <ArrowRight size={14} /></Link>
            </div>
            <div className={styles.sellRight}>
              {['Free Evaluation', 'We Call You Within 2 Hours', 'On-Site Inspection', 'Instant Payment'].map((s, i) => (
                <div key={s} className={styles.sellStep}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle tag="Customer Stories" title={<>What Our <em>Customers</em> Say</>} center />
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className="container">
          <div className={styles.contactStrip}>
            <div>
              <h3 className={styles.stripTitle}>Ready to Find Your Dream Car?</h3>
              <p className={styles.stripSub}>Visit our showroom or contact us — we're here Mon–Sat, 9 AM to 7 PM.</p>
            </div>
            <div className={styles.stripBtns}>
              <a href="tel:+919876543210" className={styles.btnOutline}>📞 Call Now</a>
              <Link to="/contact" className={styles.btnPrimary}>Contact Us <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
