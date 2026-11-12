import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import CarCard from '../../components/CarCard/CarCard'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { cars, brands, fuelTypes } from '../../data/cars'
import styles from './Cars.module.css'

export default function Cars() {
  const [search, setSearch]   = useState('')
  const [brand,  setBrand]    = useState('')
  const [fuel,   setFuel]     = useState('')
  const [sort,   setSort]     = useState('default')

  const filtered = useMemo(() => {
    let list = [...cars]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.fuel.toLowerCase().includes(q)
      )
    }
    if (brand) list = list.filter(c => c.brand === brand)
    if (fuel)  list = list.filter(c => c.fuel  === fuel)
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'year-desc')  list.sort((a, b) => b.year  - a.year)
    if (sort === 'km-asc')     list.sort((a, b) => a.km    - b.km)
    return list
  }, [search, brand, fuel, sort])

  const clearFilters = () => { setSearch(''); setBrand(''); setFuel(''); setSort('default') }
  const hasFilters = search || brand || fuel || sort !== 'default'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={styles.tag}>Our Inventory</span>
            <h1 className={styles.h1}>Available Cars</h1>
            <p className={styles.sub}>{cars.length} vehicles available · Updated daily · All verified</p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filters}>
            <div className={styles.searchWrap}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search brand, model…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select value={brand} onChange={e => setBrand(e.target.value)} className={styles.select}>
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select value={fuel} onChange={e => setFuel(e.target.value)} className={styles.select}>
              <option value="">All Fuel Types</option>
              {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
            </select>

            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.select}>
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="year-desc">Newest First</option>
              <option value="km-asc">Lowest KM</option>
            </select>

            {hasFilters && (
              <button onClick={clearFilters} className={styles.clearBtn}>
                <X size={13} /> Clear
              </button>
            )}
          </div>
          <div className={styles.resultCount}>
            <SlidersHorizontal size={13} />
            Showing {filtered.length} of {cars.length} cars
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.body}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <span>🔍</span>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className={styles.btnPrimary}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
