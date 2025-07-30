import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const location=useLocation();
    const [open,setOpen]=useState(false);
    const navigate = useNavigate();
  return (
    <>
    <div className='navbar'>
        <Link to="/">
            <img src={assets.logo} alt="" className='h-8'/>
        </Link>



        <div className='navbarLinks'>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <button className='loginBtnNavbar' onClick={() => {navigate("/login")}}>Login</button>
        </div>

        <button className='sm:hidden cursor-pointer'  onClick={()=> setOpen (!open)}>
          <img src={open ? assets.close_icon : assets. menu_icon} alt="menu" />
        </button>

    </div>

    <div className={(open) ? "mobileLinks open" : "mobileLinks"}>
      <Link to="/">Home</Link>
      <Link to="/">Cars</Link>
      <Link to="/">My Bookings</Link>
    </div>
    </>
      )
}

export default Navbar
