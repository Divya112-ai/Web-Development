import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAdmin } from '../../context/AdminContext'
import { ArrowRight } from 'lucide-react'
import styles from './InquiryForm.module.css'

export default function InquiryForm({ carName = '' }) {
  const { addInquiry } = useAdmin()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    addInquiry({ name: form.name, phone: form.phone, interest: carName || 'General Inquiry', message: form.message })
    toast.success("Inquiry sent! We'll contact you within 2 hours.")
    setForm({ name: '', phone: '', message: '' })
    setLoading(false)
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Send Inquiry{carName && ` for ${carName}`}</h3>
      <p className={styles.sub}>We reply within 2 hours during working hours.</p>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Name *</label>
            <input type="text" placeholder="Your Name" value={form.name} onChange={set('name')} required />
          </div>
          <div className={styles.field}>
            <label>Phone *</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} required />
          </div>
        </div>
        <div className={styles.field}>
          <label>Message (optional)</label>
          <textarea
            placeholder={carName ? `I'm interested in ${carName}. Please contact me.` : 'Your message here…'}
            value={form.message}
            onChange={set('message')}
            rows={3}
          />
        </div>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Sending…' : <> Send Inquiry <ArrowRight size={14} /> </>}
        </button>
      </form>
    </div>
  )
}
