import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Trash2, CheckCheck, Filter } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { toast } from 'react-hot-toast'
import styles from './AdminInquiries.module.css'

function timeStr(d) {
  return new Date(d).toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
}

export default function AdminInquiries() {
  const { inquiries, markInquiryRead, deleteInquiry } = useAdmin()
  const [filter, setFilter] = useState('all')

  const list = inquiries
    .filter(i => filter === 'all' ? true : filter === 'unread' ? !i.read : i.read)
    .sort((a,b) => new Date(b.date) - new Date(a.date))

  const unread = inquiries.filter(i => !i.read).length

  const handleRead = i => { markInquiryRead(i.id); toast.success('Marked as read') }
  const handleDelete = i => {
    if (!window.confirm(`Delete inquiry from ${i.name}?`)) return
    deleteInquiry(i.id); toast.success('Deleted')
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Inquiries</h1>
          <p className={styles.sub}>{inquiries.length} total · <span className={styles.unreadCount}>{unread} unread</span></p>
        </div>
      </div>

      <div className={styles.tabs}>
        {['all','unread','read'].map(v => (
          <button key={v} className={`${styles.tab} ${filter===v?styles.tabActive:''}`} onClick={()=>setFilter(v)}>
            {v.charAt(0).toUpperCase()+v.slice(1)}
            {v==='unread' && unread > 0 && <span className={styles.tabBadge}>{unread}</span>}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {list.map((inq, i) => (
          <motion.div
            key={inq.id}
            className={`${styles.card} ${!inq.read ? styles.cardUnread : ''}`}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
          >
            <div className={styles.cardLeft}>
              <div className={styles.avatar}>
                {inq.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
              </div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.nameRow}>
                <span className={styles.name}>{inq.name}</span>
                {!inq.read && <span className={styles.newBadge}>NEW</span>}
                <span className={styles.time}>{timeStr(inq.date)}</span>
              </div>
              <div className={styles.interest}>
                Interested in: <strong>{inq.interest}</strong>
              </div>
              {inq.message && <div className={styles.message}>"{inq.message}"</div>}
              <div className={styles.contacts}>
                <a href={`tel:${inq.phone}`} className={styles.contactBtn}>
                  <Phone size={12}/> {inq.phone}
                </a>
                <a
                  href={`https://wa.me/91${inq.phone}?text=${encodeURIComponent(`Hi ${inq.name}, thank you for your inquiry about ${inq.interest}. How can I help you?`)}`}
                  target="_blank" rel="noreferrer"
                  className={styles.waBtn}
                >
                  <MessageCircle size={12}/> Reply on WhatsApp
                </a>
              </div>
            </div>
            <div className={styles.cardActions}>
              {!inq.read && (
                <button className={styles.readBtn} onClick={()=>handleRead(inq)} title="Mark as read">
                  <CheckCheck size={15}/>
                </button>
              )}
              <button className={styles.delBtn} onClick={()=>handleDelete(inq)} title="Delete">
                <Trash2 size={15}/>
              </button>
            </div>
          </motion.div>
        ))}
        {list.length === 0 && (
          <div className={styles.empty}>
            <Filter size={32}/>
            <p>No {filter !== 'all' ? filter : ''} inquiries found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
