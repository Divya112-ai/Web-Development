import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Car, PlusCircle, MessageSquare,
  HandCoins, LogOut, Menu, X, Bell
} from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import styles from './AdminLayout.module.css'

const NAV = [
  { to: '/admin',            icon: LayoutDashboard, label: 'Dashboard',      end: true },
  { to: '/admin/cars',       icon: Car,             label: 'Manage Cars'              },
  { to: '/admin/cars/add',    icon: PlusCircle,      label: 'Add New Car'              },
  { to: '/admin/inquiries',  icon: MessageSquare,   label: 'Inquiries',    badge: 'inquiries' },
  { to: '/admin/sell-requests',       icon: HandCoins,       label: 'Sell Requests', badge: 'sell' },
]

export default function AdminLayout() {
  const { logout, inquiries, sellReqs } = useAdmin()
  const navigate = useNavigate()
  const [sideOpen, setSideOpen] = useState(false)

  const unreadInq  = inquiries.filter(i => !i.read).length
  const unreadSell = sellReqs.filter(s => !s.read).length
  const totalUnread = unreadInq + unreadSell

  const getBadge = key => key === 'inquiries' ? unreadInq : unreadSell

  const doLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sideOpen ? styles.open : ''}`}>
        <div className={styles.sideTop}>
          <div className={styles.sideLogo}>
            <span className={styles.logoIcon}>OM</span>
            <div>
              <strong>Shri Ganesh Motors</strong>
              <em>Admin Panel</em>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setSideOpen(false)}><X size={18}/></button>
        </div>

        <nav className={styles.sideNav}>
          {NAV.map(({ to, icon: Icon, label, badge, end }) => {
            const count = badge ? getBadge(badge) : 0
            return (
              <NavLink
                key={to} to={to} end={end}
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
                onClick={() => setSideOpen(false)}
              >
                <Icon size={17} />
                <span>{label}</span>
                {count > 0 && <span className={styles.navBadge}>{count}</span>}
              </NavLink>
            )
          })}
        </nav>

        <button className={styles.logoutBtn} onClick={doLogout}>
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Overlay */}
      {sideOpen && <div className={styles.overlay} onClick={() => setSideOpen(false)} />}

      {/* Main */}
      <div className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topbar}>
          <button className={styles.burgerBtn} onClick={() => setSideOpen(true)}>
            <Menu size={20} />
          </button>
          <div className={styles.topbarTitle}>Admin Dashboard</div>
          <div className={styles.topbarRight}>
            {totalUnread > 0 && (
              <div className={styles.bellWrap}>
                <Bell size={18} />
                <span className={styles.bellBadge}>{totalUnread}</span>
              </div>
            )}
            <button className={styles.logoutBtnSm} onClick={doLogout}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
