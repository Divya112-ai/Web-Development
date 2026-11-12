import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, ArrowLeft, Plus, Star, ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAdmin } from '../../context/AdminContext'
import styles from './AdminCarForm.module.css'

const EMPTY = {
  brand:'', model:'', year: new Date().getFullYear(), fuel:'Petrol',
  transmission:'Manual', km:'', price:'', owners:'1st Owner',
  color:'', description:'', features:[], images:[], sold:false, featured:false,
}

export default function AdminCarForm() {
  const { id }           = useParams()
  const navigate         = useNavigate()
  const { cars, addCar, updateCar } = useAdmin()
  const isEdit           = Boolean(id)
  const existing         = isEdit ? cars.find(c => String(c.id) === String(id)) : null

  const [form, setForm]     = useState(() => existing ? { ...existing } : { ...EMPTY })
  const [featText, setFeat] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef             = useRef(null)

  useEffect(() => {
    if (isEdit && existing) setForm({ ...existing })
  }, [id])

  const set = k => e => setForm(v => ({ ...v, [k]: e.target.value }))
  const setCheck = k => e => setForm(v => ({ ...v, [k]: e.target.checked }))

  // ── Image handling (base64 for localStorage) ──────────────────────────
  const handleFiles = e => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (form.images.length + files.length > 10) {
      toast.error('Maximum 10 photos allowed')
      return
    }
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = ev => {
        setForm(v => ({ ...v, images: [...v.images, ev.target.result] }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeImage  = idx => setForm(v => ({ ...v, images: v.images.filter((_,i)=>i!==idx) }))
  const makeMain     = idx => setForm(v => { const imgs=[...v.images]; const [m]=imgs.splice(idx,1); return {...v, images:[m,...imgs]} })

  // ── Feature tags ────────────────────────────────────────────────────
  const addFeature = () => {
    const t = featText.trim()
    if (!t || form.features.includes(t)) return
    setForm(v => ({ ...v, features: [...v.features, t] }))
    setFeat('')
  }
  const removeFeature = f => setForm(v => ({ ...v, features: v.features.filter(x=>x!==f) }))

  // ── Submit ────────────────────────────────────────────────────────
  const submit = async e => {
    e.preventDefault()
    if (!form.brand || !form.model || !form.price || !form.km) {
      toast.error('Please fill all required fields')
      return
    }
    if (form.images.length === 0) {
      toast.error('Please upload at least one photo')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const car = { ...form, price: Number(form.price), km: Number(form.km), year: Number(form.year) }
    if (isEdit) { updateCar(car); toast.success('Car updated!') }
    else         { addCar(car);    toast.success('Car added!') }
    navigate('/admin/cars')
    setLoading(false)
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
      <div className={styles.pageHead}>
        <button className={styles.backBtn} onClick={()=>navigate('/admin/cars')}>
          <ArrowLeft size={15}/> Back
        </button>
        <div>
          <h1 className={styles.title}>{isEdit ? 'Edit Car' : 'Add New Car'}</h1>
          <p className={styles.sub}>{isEdit ? `Editing ${existing?.brand} ${existing?.model}` : 'Fill in the details below'}</p>
        </div>
      </div>

      <form onSubmit={submit} className={styles.form}>
        <div className={styles.grid}>

          {/* LEFT COLUMN */}
          <div className={styles.col}>
            {/* Basic Info */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>Brand *</label>
                  <select value={form.brand} onChange={set('brand')} required>
                    <option value="">Select Brand</option>
                    {['Maruti Suzuki','Hyundai','Honda','Toyota','Tata','Mahindra','Ford','Volkswagen','Kia','MG','Skoda','Renault','Nissan','Other'].map(b=>(
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Model *</label>
                  <input type="text" placeholder="e.g. Swift, Creta, City" value={form.model} onChange={set('model')} required/>
                </div>
              </div>
              <div className={styles.row3}>
                <div className={styles.field}>
                  <label>Year *</label>
                  <select value={form.year} onChange={set('year')}>
                    {Array.from({length:20},(_,i)=>new Date().getFullYear()-i).map(y=>(
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Fuel Type *</label>
                  <select value={form.fuel} onChange={set('fuel')}>
                    {['Petrol','Diesel','CNG','Electric','Hybrid'].map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Transmission</label>
                  <select value={form.transmission} onChange={set('transmission')}>
                    {['Manual','Automatic','AMT','CVT','DCT'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.row3}>
                <div className={styles.field}>
                  <label>KM Driven *</label>
                  <input type="number" placeholder="e.g. 45000" value={form.km} onChange={set('km')} required min="0"/>
                </div>
                <div className={styles.field}>
                  <label>Price (₹) *</label>
                  <input type="number" placeholder="e.g. 850000" value={form.price} onChange={set('price')} required min="0"/>
                </div>
                <div className={styles.field}>
                  <label>Owners</label>
                  <select value={form.owners} onChange={set('owners')}>
                    {['1st Owner','2nd Owner','3rd Owner','4th+ Owner'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>Color</label>
                  <input type="text" placeholder="e.g. Pearl White" value={form.color} onChange={set('color')}/>
                </div>
                <div className={styles.field}>
                  <label>Variant / Trim</label>
                  <input type="text" placeholder="e.g. VXI, SX, ZX+" value={form.variant||''} onChange={set('variant')}/>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <div className={styles.field}>
                <label>Car Description</label>
                <textarea
                  rows={5}
                  placeholder="Describe the car's condition, history, features, any notable details…"
                  value={form.description}
                  onChange={set('description')}
                />
              </div>
            </div>

            {/* Features */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Features</h3>
              <div className={styles.featInput}>
                <input
                  type="text"
                  placeholder="e.g. Sunroof, Apple CarPlay, ABS…"
                  value={featText}
                  onChange={e=>setFeat(e.target.value)}
                  onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addFeature() } }}
                />
                <button type="button" className={styles.featAddBtn} onClick={addFeature}>
                  <Plus size={14}/> Add
                </button>
              </div>
              {form.features.length > 0 && (
                <div className={styles.featTags}>
                  {form.features.map(f=>(
                    <span key={f} className={styles.featTag}>
                      {f}
                      <button type="button" onClick={()=>removeFeature(f)}><X size={11}/></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Flags */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Listing Options</h3>
              <div className={styles.checkRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.featured} onChange={setCheck('featured')}/>
                  <span className={styles.checkBox}></span>
                  Show in Featured Cars on Homepage
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.sold} onChange={setCheck('sold')}/>
                  <span className={styles.checkBox}></span>
                  Mark as Sold
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Photos */}
          <div className={styles.col}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Car Photos <span className={styles.photoCount}>{form.images.length}/10</span></h3>
              <p className={styles.photoHint}>First photo will be the main display image. Click ★ to make any photo the main one.</p>

              {/* Drop zone */}
              <div
                className={styles.dropZone}
                onClick={()=>fileRef.current?.click()}
                onDragOver={e=>e.preventDefault()}
                onDrop={e=>{ e.preventDefault(); handleFiles({target:{files:e.dataTransfer.files}}) }}
              >
                <ImageIcon size={32} className={styles.dropIcon}/>
                <div className={styles.dropText}>Click or drag photos here</div>
                <div className={styles.dropSub}>JPG, PNG, WEBP · Max 10 photos</div>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} hidden/>
              </div>

              {/* Previews */}
              {form.images.length > 0 && (
                <div className={styles.previews}>
                  {form.images.map((src, i) => (
                    <div key={i} className={`${styles.preview} ${i===0?styles.previewMain:''}`}>
                      <img src={src} alt={`Photo ${i+1}`}/>
                      {i === 0 && <span className={styles.mainTag}>Main</span>}
                      <div className={styles.previewActions}>
                        {i !== 0 && (
                          <button type="button" className={styles.starBtn} onClick={()=>makeMain(i)} title="Make main photo">
                            <Star size={13}/>
                          </button>
                        )}
                        <button type="button" className={styles.removeBtn} onClick={()=>removeImage(i)}>
                          <X size={13}/>
                        </button>
                      </div>
                    </div>
                  ))}
                  {form.images.length < 10 && (
                    <div className={styles.addMoreBtn} onClick={()=>fileRef.current?.click()}>
                      <Plus size={22}/>
                      <span>Add More</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className={styles.formFooter}>
          <button type="button" className={styles.cancelBtn} onClick={()=>navigate('/admin/cars')}>Cancel</button>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving…' : isEdit ? 'Update Car' : 'Publish Car Listing'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
