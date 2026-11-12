import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { toast } from 'react-hot-toast'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const { login } = useAdmin()
  const navigate   = useNavigate()
  const [u, setU]  = useState('')
  const [p, setP]  = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    if (login(u, p)) {
      toast.success('Welcome back!')
      navigate('/admin')
    } else {
      toast.error('Invalid username or password')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.top}>
          <div className={styles.logoWrap}>
            <span className={styles.logoIcon}>OM</span>
          </div>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.sub}>Shri Ganesh Motors · Dealer Dashboard</p>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label>Username</label>
            <input
              type="text"
              placeholder="admin"
              value={u}
              onChange={e => setU(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <div className={styles.passWrap}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                value={p}
                onChange={e => setP(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" className={styles.eye} onClick={() => setShow(v => !v)}>
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in…' : <><LogIn size={15} /> Sign In</>}
          </button>
        </form>

        <div className={styles.hint}>
          <Shield size={12} /> Secured · Only the owner can access this panel
        </div>
      </motion.div>
    </div>
  )
}
