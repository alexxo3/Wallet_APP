import { Navigate, Route, Routes } from 'react-router-dom'
import { TransactionsList } from './pages/TransactionsList'
import { TransactionDetail } from './pages/TransactionDetail'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
