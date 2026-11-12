import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useAdmin } from '../../context/AdminContext'
import { ArrowRight, CheckCircle } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import styles from './SellCar.module.css'

const STEPS = [
  { icon: '📸', title: 'Share Details', desc: 'Fill in your car info below' },
  { icon: '📞', title: 'We Call You',   desc: 'Within 2 hours on working days' },
  { icon: '🔍', title: 'Inspection',    desc: 'Free on-site evaluation' },
  { icon: '💰', title: 'Get Paid',       desc: 'Instant fair payment' },
]

const BRANDS = ['Maruti Suzuki','Hyundai','Honda','Toyota','Tata','Mahindra','Ford','Volkswagen','Kia','MG','Renault','Nissan','Skoda','Jeep','Other']
const YEARS  = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString())

export default function SellCar() {
  const { addSellReq } = useAdmin()
  const [form, setForm] = useState({ name:'', phone:'', brand:'', model:'', year:'', km:'', price:'', notes:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    const required = ['name','phone','brand','model','year','price']
    if (required.some(k => !form[k].trim())) { toast.error('Please fill in all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    addSellReq({ name:form.name, phone:form.phone, brand:form.brand, model:form.model, year:form.year, km:form.km, price:form.price })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={styles.heroContent}>
            <span className={styles.tag}>Sell Your Car</span>
            <h1 className={styles.h1}>Get the Best Price<br /><em>for Your Car</em></h1>
            <p className={styles.sub}>Free evaluation · Fair market price · Zero hassle · Quick payment.<br />We buy all brands and models, any condition.</p>
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                <div key={s.title} className={styles.step}>
                  <span className={styles.stepIcon}>{s.icon}</span>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <div className={styles.stepDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className={styles.body}>
        <div className="container">
          <div className={styles.formWrap}>
            {submitted ? (
              <motion.div className={styles.success} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckCircle size={56} className={styles.successIcon} />
                <h2>Request Submitted!</h2>
                <p>Thank you, <strong>{form.name}</strong>! We've received your sell request for your <strong>{form.brand} {form.model}</strong>. Our team will call you within 2 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',brand:'',model:'',year:'',km:'',price:'',notes:'' }) }} className={styles.btnPrimary}>
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.form onSubmit={submit} className={styles.form} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className={styles.formHeader}>
                  <h2>Your Details</h2>
                  <p>Fields marked with * are required</p>
                </div>

                <div className={styles.section}>
                  <div className={styles.sectionLabel}>Contact Information</div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label>Full Name *</label>
                      <input type="text" placeholder="Rajesh Patel" value={form.name} onChange={set('name')} required />
                    </div>
                    <div className={styles.field}>
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+91 98XXX XXXXX" value={form.phone} onChange={set('phone')} required />
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <div className={styles.sectionLabel}>Car Details</div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label>Car Brand *</label>
                      <select value={form.brand} onChange={set('brand')} required>
                        <option value="">Select Brand</option>
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>Model *</label>
                      <input type="text" placeholder="e.g. Swift, Creta, City" value={form.model} onChange={set('model')} required />
                    </div>
                    <div className={styles.field}>
                      <label>Year *</label>
                      <select value={form.year} onChange={set('year')} required>
                        <option value="">Select Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>KM Driven</label>
                      <input type="number" placeholder="e.g. 45000" value={form.km} onChange={set('km')} min="0" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Expected Price (₹) *</label>
                    <input type="text" placeholder="e.g. 5,00,000 or 5 lakh" value={form.price} onChange={set('price')} required />
                  </div>
                  <div className={styles.field}>
                    <label>Additional Notes</label>
                    <textarea placeholder="Any other details about your car — condition, modifications, service history…" value={form.notes} onChange={set('notes')} rows={3} />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Submitting…' : <> Submit Sell Request <ArrowRight size={15} /> </>}
                </button>
              </motion.form>
            )}
          </div>

          {/* Why sell here */}
          <div className={styles.why}>
            {[
              { icon: '💰', t: 'Best Market Price',    d: 'We offer competitive prices based on current market rates — no lowballing.' },
              { icon: '⚡', t: 'Quick Process',         d: 'Inspection to payment in as little as 24 hours. We value your time.' },
              { icon: '📑', t: 'We Handle Paperwork',   d: 'All RC transfer and documentation handled by our expert team.' },
              { icon: '✅', t: 'All Brands Welcome',    d: 'Any brand, any model, any condition — we make an offer for everything.' },
            ].map(w => (
              <div key={w.t} className={styles.whyItem}>
                <span className={styles.whyIcon}>{w.icon}</span>
                <div>
                  <div className={styles.whyTitle}>{w.t}</div>
                  <div className={styles.whyDesc}>{w.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
