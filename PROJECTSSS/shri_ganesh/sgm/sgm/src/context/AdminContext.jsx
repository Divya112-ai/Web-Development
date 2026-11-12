import { createContext, useContext, useState, useEffect } from 'react'
import { cars as SEED_CARS } from '../data/cars'

const Ctx = createContext(null)

const KEY_CARS      = 'sgm_cars'
const KEY_INQ       = 'sgm_inquiries'
const KEY_SELL      = 'sgm_sell_requests'
const KEY_AUTH      = 'sgm_admin_auth'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'sgmotors2024'

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function save(key, val) { localStorage.setItem(key, JSON.stringify(val)) }

const SEED_INQ = [
  { id: 1, name: 'Rajesh Patel',  phone: '9876543210', interest: 'Hyundai Creta SX',  message: 'Interested in test drive', date: '2024-06-01T10:00:00Z', read: false },
  { id: 2, name: 'Suresh Mehta',  phone: '8765432109', interest: 'RTO Work',           message: '',                         date: '2024-06-02T14:30:00Z', read: false },
  { id: 3, name: 'Priya Desai',   phone: '7654321098', interest: 'Maruti Swift VXI',   message: 'What is the final price?', date: '2024-06-03T09:15:00Z', read: true  },
]
const SEED_SELL = [
  { id: 1, name: 'Vikram Joshi',  phone: '9765432101', brand: 'Maruti', model: 'Baleno', year: '2019', km: '55000', price: '650000', date: '2024-06-01T11:00:00Z', read: false },
  { id: 2, name: 'Kavita Nair',   phone: '8654321090', brand: 'Tata',   model: 'Nexon',  year: '2020', km: '42000', price: '900000', date: '2024-06-02T13:00:00Z', read: false },
]

export function AdminProvider({ children }) {
  const [authed,    setAuthed]    = useState(() => load(KEY_AUTH, false))
  const [cars,      setCars]      = useState(() => load(KEY_CARS, SEED_CARS))
  const [inquiries, setInquiries] = useState(() => load(KEY_INQ,  SEED_INQ))
  const [sellReqs,  setSellReqs]  = useState(() => load(KEY_SELL, SEED_SELL))

  useEffect(() => save(KEY_AUTH, authed),    [authed])
  useEffect(() => save(KEY_CARS, cars),      [cars])
  useEffect(() => save(KEY_INQ,  inquiries), [inquiries])
  useEffect(() => save(KEY_SELL, sellReqs),  [sellReqs])

  const login  = (u, p) => { if (u===ADMIN_USER && p===ADMIN_PASS){ setAuthed(true); return true } return false }
  const logout = ()      => setAuthed(false)

  const addCar     = car  => setCars(v => [{ ...car, id: Date.now() }, ...v])
  const updateCar  = car  => setCars(v => v.map(c => c.id===car.id ? car : c))
  const deleteCar  = id   => setCars(v => v.filter(c => c.id!==id))
  const toggleSold = id   => setCars(v => v.map(c => c.id===id ? {...c, sold:!c.sold} : c))

  const addInquiry      = data => setInquiries(v => [{ ...data, id:Date.now(), date:new Date().toISOString(), read:false }, ...v])
  const markInquiryRead = id   => setInquiries(v => v.map(i => i.id===id ? {...i, read:true} : i))
  const deleteInquiry   = id   => setInquiries(v => v.filter(i => i.id!==id))

  const addSellReq   = data => setSellReqs(v => [{ ...data, id:Date.now(), date:new Date().toISOString(), read:false }, ...v])
  const markSellRead = id   => setSellReqs(v => v.map(s => s.id===id ? {...s, read:true} : s))
  const deleteSell   = id   => setSellReqs(v => v.filter(s => s.id!==id))

  return (
    <Ctx.Provider value={{
      isLoggedIn: authed, login, logout,
      cars, addCar, updateCar, deleteCar, toggleSold,
      inquiries, addInquiry, markInquiryRead, deleteInquiry,
      sellReqs,  addSellReq,  markSellRead,  deleteSell,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAdmin = () => useContext(Ctx)
