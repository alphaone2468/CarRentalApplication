import React, { useState,useEffect } from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const location=useLocation();
    const [open,setOpen]=useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

      useEffect(() => {
        getProfile();
      },[]);
    
      const getProfile = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/users/loggedIn", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          console.log("Profile data:", data);
          setUser(data.user);
          if (data.status==="FAILED") {
            console.log("User not logged in");
            // navigate("/login");
          }
        }
        catch (error) {
          console.error("Error fetching profile:", error);
        }
      }


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
            <Link to="/booking-requests">My Cars</Link>

            {user && <img src={assets.testimonial_image_1} alt="" style={{display:"inline" , width:"40px", borderRadius:"50%",border:"1px solid black",marginLeft:"10px"}}  />}
            {!user && <button className='loginBtnNavbar' onClick={() => {navigate("/login")}}>Login</button>}
        </div>

        <button className='sm:hidden cursor-pointer'  onClick={()=> setOpen (!open)}>
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
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
