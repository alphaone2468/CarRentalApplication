import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/Signup'
import Home from './components/Home'
import Cars from './components/Cars'
import './App.css'
import CarDetails from './components/CarDetails'
import MyBookings from './components/MyBookings'
import ListCar from './components/ListCar'

export default function App() {
  const location=useLocation();
  useEffect(()=>{

    window.scrollTo({
      top:"0px"
    })
  },[location.pathname])
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/car-details' element={<CarDetails/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/list-car' element={<ListCar/>}/>
      </Routes>
    </div>
  )
}
