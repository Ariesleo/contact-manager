import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import { Home } from './pages/home'
import { SignIn } from './pages/signIn'
import { SignUp } from './pages/signUp'
import NavBar from './components/navBar'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
