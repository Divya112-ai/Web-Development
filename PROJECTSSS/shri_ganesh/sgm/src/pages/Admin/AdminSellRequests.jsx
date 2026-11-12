import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Trash2, CheckCheck, HandCoins } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { toast } from 'react-hot-toast'
import styles from './AdminSellRequests.module.css'

function fmt(p) { return p ? `₹${Number(p).toLocaleString('en-IN')}` : '—' }
function timeStr(d) {
  return new Date(d).toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
}

export default function AdminSellRequests() {
  const { sellReqs, markSellRead, deleteSell } = useAdmin()
  const [filter, setFilter] = useState('all')

  const list = sellReqs
    .filter(s => filter === 'all' ? true : filter === 'unread' ? !s.read : s.read)
    .sort((a,b) => new Date(b.date) - new Date(a.date))

  const unread = sellReqs.filter(s => !s.read).length

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Sell Car Requests</h1>
          <p className={styles.sub}>{sellReqs.length} total · <span className={styles.unreadCount}>{unread} unread</span></p>
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
        {list.map((req, i) => (
          <motion.div
            key={req.id}
            className={`${styles.card} ${!req.read ? styles.cardUnread : ''}`}
            initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
          >
            <div className={styles.avatar}>
              {req.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
            </div>

            <div className={styles.body}>
              <div className={styles.nameRow}>
                <span className={styles.name}>{req.name}</span>
                {!req.read && <span className={styles.newBadge}>NEW</span>}
                <span className={styles.time}>{timeStr(req.date)}</span>
              </div>

              {/* Car details */}
              <div className={styles.carInfo}>
                <span className={styles.carChip}>🚗 {req.brand} {req.model}</span>
                <span className={styles.carChip}>📅 {req.year}</span>
                <span className={styles.carChip}>📍 {Number(req.km).toLocaleString('en-IN')} km</span>
                <span className={styles.priceChip}>💰 Asking {fmt(req.price)}</span>
              </div>

              <div className={styles.contacts}>
                <a href={`tel:${req.phone}`} className={styles.contactBtn}>
                  <Phone size={12}/> {req.phone}
                </a>
                <a
                  href={`https://wa.me/91${req.phone}?text=${encodeURIComponent(`Hi ${req.name}, we received your request to sell your ${req.brand} ${req.model} (${req.year}). We'd like to schedule a free evaluation. When are you available?`)}`}
                  target="_blank" rel="noreferrer"
                  className={styles.waBtn}
                >
                  <MessageCircle size={12}/> Reply on WhatsApp
                </a>
              </div>
            </div>

            <div className={styles.actions}>
              {!req.read && (
                <button className={styles.readBtn} onClick={()=>{ markSellRead(req.id); toast.success('Marked as read') }} title="Mark as read">
                  <CheckCheck size={15}/>
                </button>
              )}
              <button className={styles.delBtn} onClick={()=>{ if(window.confirm(`Delete request from ${req.name}?`)){ deleteSell(req.id); toast.success('Deleted') } }} title="Delete">
                <Trash2 size={15}/>
              </button>
            </div>
          </motion.div>
        ))}
        {list.length === 0 && (
          <div className={styles.empty}>
            <HandCoins size={32}/>
            <p>No {filter !== 'all' ? filter : ''} sell requests found</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
