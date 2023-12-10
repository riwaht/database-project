import React from 'react'
import ReactDOM from 'react-dom/client'
import Patient from './components/Patient.jsx'
import Login from './Login.jsx'
import LandingPage from './components/LandingPage.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
