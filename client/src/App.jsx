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
import { Toaster } from 'react-hot-toast';
import BookingRequests from './components/BookingRequests'
import Test1 from './components/Test1'
import Test2 from './components/Test2'

export default function App() {
  const location=useLocation();
  useEffect(()=>{

    window.scrollTo({
      top:"0px"
    })
  },[location.pathname])
  return (
    <div>
    <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            // some dark green color
            padding: '10px 35px',
            fontSize: '17px',
            fontFamily: 'Lato, sans-serif',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed89',
            },
            style: {
              color: 'green',
              // border: '1px solid green',
              backgroundColor:"#e7ffe7"
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'pink',
            },
            style: {
              color: 'red',
              backgroundColor:"#fedddd"

            },
          },
        }}
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/list-car' element={<ListCar/>}/>
        <Route path="/booking-requests" element={<BookingRequests/>}/>
        <Route path="/test1" element={<Test1/>}/>
        <Route path="/test2" element={<Test2/>}/>
      </Routes>
    </div>
  )
}
