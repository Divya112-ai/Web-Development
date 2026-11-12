import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from './context/AdminContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0F172A',
              color: '#F8FAFC',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
            },
            success: { iconTheme: { primary: '#F59E0B', secondary: '#000' } },
            error:   { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
          }}
        />
      </BrowserRouter>
    </AdminProvider>
  )
}
