import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAdmin } from '../context/AdminContext'

import MainLayout        from '../layouts/MainLayout/MainLayout'
import Home              from '../pages/Home/Home'
import Cars              from '../pages/Cars/Cars'
import CarDetail         from '../pages/CarDetail/CarDetail'
import SellCar           from '../pages/SellCar/SellCar'
import Services          from '../pages/Services/Services'
import Contact           from '../pages/Contact/Contact'

import AdminLogin        from '../pages/Admin/AdminLogin'
import AdminLayout       from '../pages/Admin/AdminLayout'
import AdminDashboard    from '../pages/Admin/AdminDashboard'
import AdminCars         from '../pages/Admin/AdminCars'
import AdminCarForm      from '../pages/Admin/AdminCarForm'
import AdminInquiries    from '../pages/Admin/AdminInquiries'
import AdminSellRequests from '../pages/Admin/AdminSellRequests'

function Guard({ children }) {
  const { isLoggedIn } = useAdmin()
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />
}

export default function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/"         element={<Home />} />
          <Route path="/cars"     element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/sell"     element={<SellCar />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
        </Route>

        {/* Admin login (no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected */}
        <Route path="/admin" element={<Guard><AdminLayout /></Guard>}>
          <Route index                    element={<AdminDashboard />} />
          <Route path="dashboard"         element={<AdminDashboard />} />
          <Route path="cars"              element={<AdminCars />} />
          <Route path="cars/add"          element={<AdminCarForm />} />
          <Route path="cars/edit/:id"     element={<AdminCarForm />} />
          <Route path="inquiries"         element={<AdminInquiries />} />
          <Route path="sell-requests"     element={<AdminSellRequests />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
