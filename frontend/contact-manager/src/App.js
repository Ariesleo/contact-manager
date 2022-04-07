import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css'
import { Home } from './pages/home'
import { SignIn } from './pages/signIn'
import { SignUp } from './pages/signUp'
import { NewContact } from './pages/newContact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/newcontact" element={<NewContact />} />
      </Routes>
    </Router>
  )
}

export default App
