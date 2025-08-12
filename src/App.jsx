import React, { useState } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import CompanyForm from './components/CompanyForm'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleAuthSuccess = (data) => {
    setIsAuthenticated(true)
    setUserData(data)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserData(null)
  }

  return (
    <HeroUIProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                !isAuthenticated ? (
                  <AuthForm onAuthSuccess={handleAuthSuccess} />
                ) : (
                  <Navigate to="/company-setup" replace />
                )
              } 
            />
            <Route 
              path="/company-setup" 
              element={
                isAuthenticated ? (
                  <CompanyForm userData={userData} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </HeroUIProvider>
  )
}

export default App
