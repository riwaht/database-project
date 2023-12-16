import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import LandingPage from './components/LandingPage'
import Patient from './components/Patient'
import Provider from './components/Provider'
import PatientInfo from './components/PatientInfo'
import Appointment from './components/Appointment'
import Test from './components/Test'
import Lab from './components/Lab'
import Prescription from './components/Prescription'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/patientInfo" element={<PatientInfo />} />
        <Route path="/test" element={<Test />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/prescription" element={<Prescription />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
