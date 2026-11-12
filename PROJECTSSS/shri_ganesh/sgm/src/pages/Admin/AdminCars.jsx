import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, CheckCircle, Circle, Search } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { toast } from 'react-hot-toast'
import styles from './AdminCars.module.css'

function fmt(p) { return p >= 100000 ? `₹${(p/100000).toFixed(2)}L` : `₹${p?.toLocaleString('en-IN')}` }

export default function AdminCars() {
  const { cars, deleteCar, toggleSold } = useAdmin()
  const [search, setSearch] = useState('')
  const [filterSold, setFilterSold] = useState('all')

  const filtered = cars.filter(c => {
    const matchSearch = `${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase())
    const matchSold   = filterSold === 'all' ? true : filterSold === 'sold' ? c.sold : !c.sold
    return matchSearch && matchSold
  })

  const handleDelete = (car) => {
    if (!window.confirm(`Delete "${car.brand} ${car.model}"? This cannot be undone.`)) return
    deleteCar(car.id)
    toast.success('Car deleted')
  }

  const handleToggleSold = (car) => {
    toggleSold(car.id)
    toast.success(car.sold ? 'Marked as Available' : 'Marked as Sold')
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Manage Cars</h1>
          <p className={styles.sub}>{cars.length} total · {cars.filter(c=>!c.sold).length} available · {cars.filter(c=>c.sold).length} sold</p>
        </div>
        <Link to="/admin/cars/add" className={styles.addBtn}><Plus size={15}/> Add New Car</Link>
      </div>

      {/* Filters */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon}/>
          <input
            className={styles.searchInput}
            placeholder="Search by brand, model, year…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.tabs}>
          {['all','available','sold'].map(v => (
            <button key={v} className={`${styles.tab} ${filterSold===v?styles.tabActive:''}`} onClick={()=>setFilterSold(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Car</th>
                <th>Year</th>
                <th>Fuel</th>
                <th>KM</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car, i) => (
                <motion.tr key={car.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}>
                  <td>
                    <div className={styles.carCell}>
                      <img src={car.images?.[0]} alt="" className={styles.thumb}/>
                      <div>
                        <div className={styles.carName}>{car.brand} {car.model}</div>
                        <div className={styles.carSub}>{car.transmission} · {car.owners}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.cell}>{car.year}</td>
                  <td className={styles.cell}>{car.fuel}</td>
                  <td className={styles.cell}>{car.km?.toLocaleString('en-IN')} km</td>
                  <td className={styles.price}>{fmt(car.price)}</td>
                  <td>
                    <button className={car.sold ? styles.badgeSold : styles.badgeAvail} onClick={()=>handleToggleSold(car)}>
                      {car.sold ? <CheckCircle size={11}/> : <Circle size={11}/>}
                      {car.sold ? 'Sold' : 'Available'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/admin/cars/edit/${car.id}`} className={styles.editBtn}><Pencil size={13}/> Edit</Link>
                      <button className={styles.delBtn} onClick={()=>handleDelete(car)}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className={styles.empty}>No cars found{search ? ` for "${search}"` : ''}</div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
