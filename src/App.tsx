import { Navigate, Route, Routes } from 'react-router-dom'
import { ServiceDetailsPage } from './pages/ServiceDetailsPage'
import { ServicesListPage } from './pages/ServicesListPage'
import './App.css'

export const App = () => (
  <div className="app">
    <header className="app-header">
      <span className="app-logo">Сервисный центр</span>
    </header>

    <main className="app-main">
      <Routes>
        <Route path="/" element={<ServicesListPage />} />
        <Route path="/:id/details" element={<ServiceDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
)