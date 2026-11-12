import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, MessageSquare, HandCoins, TrendingUp, Plus, Eye, CheckCircle } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import styles from './AdminDashboard.module.css'

function fmt(p) {
  if (p >= 100000) return `₹${(p/100000).toFixed(2)}L`
  return `₹${p.toLocaleString('en-IN')}`
}
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff/60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m/60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}

export default function AdminDashboard() {
  const { cars, inquiries, sellReqs } = useAdmin()

  const activeCars  = cars.filter(c => !c.sold).length
  const soldCars    = cars.filter(c =>  c.sold).length
  const unreadInq   = inquiries.filter(i => !i.read).length
  const unreadSell  = sellReqs.filter(s => !s.read).length

  const recentCars  = [...cars].slice(0, 5)
  const recentInq   = [...inquiries].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,4)

  const stats = [
    { label: 'Active Listings', value: activeCars,  icon: Car,           color: '#F59E0B', link: '/admin/cars' },
    { label: 'Cars Sold',       value: soldCars,    icon: TrendingUp,    color: '#22C55E', link: '/admin/cars' },
    { label: 'New Inquiries',   value: unreadInq,   icon: MessageSquare, color: '#3B82F6', link: '/admin/inquiries' },
    { label: 'Sell Requests',   value: unreadSell,  icon: HandCoins,     color: '#A855F7', link: '/admin/sell-requests' },
  ]

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Welcome back! Here's what's happening.</p>
        </div>
        <Link to="/admin/cars/add" className={styles.addBtn}>
          <Plus size={16}/> Add New Car
        </Link>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {stats.map((s,i) => (
          <motion.div key={s.label} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
            <Link to={s.link} className={styles.statCard}>
              <div className={styles.statIcon} style={{background:`${s.color}18`, border:`1px solid ${s.color}35`}}>
                <s.icon size={20} style={{color:s.color}}/>
              </div>
              <div className={styles.statVal} style={{color:s.color}}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Recent Inventory */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h2>Recent Inventory</h2>
            <Link to="/admin/cars">View All <Eye size={13}/></Link>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Price</th>
                  <th>KM</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCars.map(car => (
                  <tr key={car.id}>
                    <td>
                      <div className={styles.carCell}>
                        <img src={car.images?.[0]} alt="" className={styles.carThumb}/>
                        <div>
                          <div className={styles.carName}>{car.brand} {car.model}</div>
                          <div className={styles.carYear}>{car.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.price}>{fmt(car.price)}</td>
                    <td className={styles.muted}>{car.km?.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={car.sold ? styles.badgeSold : styles.badgeAvail}>
                        {car.sold ? 'Sold' : 'Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h2>Recent Inquiries</h2>
            <Link to="/admin/inquiries">View All <Eye size={13}/></Link>
          </div>
          <div className={styles.inqList}>
            {recentInq.map(inq => (
              <div key={inq.id} className={`${styles.inqItem} ${!inq.read ? styles.inqUnread : ''}`}>
                <div className={styles.inqAvatar}>
                  {inq.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
                </div>
                <div className={styles.inqInfo}>
                  <div className={styles.inqName}>
                    {inq.name}
                    {!inq.read && <span className={styles.newTag}>NEW</span>}
                  </div>
                  <div className={styles.inqCar}>{inq.interest}</div>
                  <div className={styles.inqPhone}>{inq.phone}</div>
                </div>
                <div className={styles.inqTime}>{timeAgo(inq.date)}</div>
              </div>
            ))}
            {recentInq.length === 0 && <p className={styles.empty}>No inquiries yet</p>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
