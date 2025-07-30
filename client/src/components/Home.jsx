import React from "react";
import { useEffect,useState } from "react";
import "../styles/Home.css";
import { assets } from "../assets/assets";
import { Users, Fuel, Settings, MapPin, Star } from "lucide-react";
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

export default function Home() {
  const cars = [
    {
      id: 1,
      name: "BMW X5",
      type: "SUV",
      year: 2006,
      price: 300,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Hybrid",
      transmission: "Semi-Automatic",
      location: "New York",
    },
    {
      id: 2,
      name: "Toyota Corolla",
      type: "Sedan",
      year: 2021,
      price: 130,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Diesel",
      transmission: "Automatic",
      location: "Los Angeles",
    },
    {
      id: 3,
      name: "BMW X5",
      type: "SUV",
      year: 2006,
      price: 300,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Hybrid",
      transmission: "Semi-Automatic",
      location: "New York",
    },
    {
      id: 4,
      name: "Toyota Corolla",
      type: "Sedan",
      year: 2021,
      price: 130,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Diesel",
      transmission: "Automatic",
      location: "Los Angeles",
    },
    {
      id: 5,
      name: "Jeep Wrangler",
      type: "SUV",
      year: 2023,
      price: 200,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Gasoline",
      transmission: "Manual",
      location: "Denver",
    },
    {
      id: 6,
      name: "Ford Neo 6",
      type: "Sedan",
      year: 2022,
      price: 209,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      seats: 4,
      fuelType: "Electric",
      transmission: "Automatic",
      location: "Miami",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      review:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      id: 2,
      name: "John Smith",
      location: "New York, USA",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 5,
      review:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      id: 3,
      name: "Ava Johnson",
      location: "Sydney, Australia",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      review:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

    const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    // Handle subscription logic here
    setEmail('');
  };

  return (
    <div>
      <div className="mainHeadingContainer">
        <h1 className="heading">Book Luxury Cars Starting at $49 </h1>
        <p className="tc tagline">Experience premium comfort and style with our exclusive fleet of luxury vehicles. Perfect for business trips, special occasions, or when you simply deserve the best </p>
        <div className="mainCarDiv">
          <img src={assets.car_test1} alt="" className="mainCar" />
        </div>
      </div>

      <h1 className="heading">Featured Cars </h1>

      <div className="container">
        <div className="grid">
          {cars.map((car) => (
            <div key={car.id} className="card">
              <div className="imageContainer">
                <img src={car.image} alt={car.name} className="carImage" />
                <div className="availableBadge">Available Now</div>
                <div className="priceTag">
                  <span className="price">${car.price}</span>
                  <span className="period">/ day</span>
                </div>
              </div>

              <div className="cardContent">
                <h3 className="carName">{car.name}</h3>
                <p className="carDetails">
                  {car.type} • {car.year}
                </p>

                <div className="specs">
                  <div className="spec">
                    <Users size={16} className="icon" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="spec">
                    <Fuel size={16} className="icon" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="spec">
                    <Settings size={16} className="icon" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="spec">
                    <MapPin size={16} className="icon" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="listContainer">
        <div className="banner">
          <div className="content">
            <div className="textSection">
              <h1 className="OwnTitle">Do You Own a Luxury Car?</h1>
              <p className="description">
                Monetize your vehicle effortlessly by listing it on CarRental.
                <br />
                We take care of insurance, driver verification and secure
                payments — so
                <br />
                you can earn passive income, stress-free.
              </p>
              <button className="ctaButton">List your car</button>
            </div>

            <div className="imageSection">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="White BMW luxury car"
                className="listCarImage"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="reviewsContainer">
        <div className="reviews">
          <div className="header">
            <h2 className="title">What Our Customers Say</h2>
            <p className="subtitle">
              Discover why discerning travelers choose StayVenture for their
              luxury accommodations
              <br />
              around the world.
            </p>
          </div>

          <div className="testimonialsGrid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonialCard">
                <div className="customerInfo">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="avatar"
                  />
                  <div className="customerDetails">
                    <h4 className="customerName">{testimonial.name}</h4>
                    <p className="customerLocation">{testimonial.location}</p>
                  </div>
                </div>

                <div className="rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < testimonial.rating ? "#4285f4" : "none"}
                      color={index < testimonial.rating ? "#4285f4" : "#e5e7eb"}
                      style={{ marginRight: "2px" }}
                    />
                  ))}
                </div>

                <p className="reviewText">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="">
  {/* Newsletter Section */}
  <div className="newsletterSection">
    <div className="newsletterContent">
      <h2 className="newsletterTitle">Never Miss a Deal!</h2>
      <p className="newsletterSubtitle">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form onSubmit={handleSubscribe} className="subscriptionForm">
        <input
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="emailInputBox"
          required
        />
        <button type="submit" className="subscribeButton">
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Footer Section */}
  <div className="footerSection">
    <div className="footerContent">
      <div className="footerGrid">
        {/* Brand Column */}
        <div className="brandColumn">
          <div className="logo">
            <div className="logoIcon">🚗</div>
            <span className="logoText">CarRental</span>
          </div>
          <p className="brandDescription">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          <div className="socialLinks">
            <a href="#" className="socialLink"><Facebook size={20} /></a>
            <a href="#" className="socialLink"><Instagram size={20} /></a>
            <a href="#" className="socialLink"><Twitter size={20} /></a>
            <a href="#" className="socialLink"><Mail size={20} /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footerColumn">
          <h4 className="columnTitle">QUICK LINKS</h4>
          <ul className="linkList">
            <li><a href="#" className="footerLink">Home</a></li>
            <li><a href="#" className="footerLink">Browse Cars</a></li>
            <li><a href="#" className="footerLink">List Your Car</a></li>
            <li><a href="#" className="footerLink">About Us</a></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footerColumn">
          <h4 className="columnTitle">RESOURCES</h4>
          <ul className="linkList">
            <li><a href="#" className="footerLink">Help Center</a></li>
            <li><a href="#" className="footerLink">Terms of Service</a></li>
            <li><a href="#" className="footerLink">Privacy Policy</a></li>
            <li><a href="#" className="footerLink">Insurance</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footerColumn">
          <h4 className="columnTitle">CONTACT</h4>
          <div className="contactInfo">
            <div className="contactItem">
              <MapPin size={16} className="contactIcon" />
              <div>
                <div>1234 Luxury Drive</div>
                <div>San Francisco, CA 94107</div>
              </div>
            </div>
            <div className="contactItem">
              <Phone size={16} className="contactIcon" />
              <div>+1 234 567890</div>
            </div>
            <div className="contactItem">
              <Mail size={16} className="contactIcon" />
              <div>info@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footerBottom">
        <div className="copyright">
          © 2025 Brand. All rights reserved.
        </div>
        <div className="legalLinks">
          <a href="#" className="legalLink">Privacy</a>
          <span className="separator">|</span>
          <a href="#" className="legalLink">Terms</a>
          <span className="separator">|</span>
          <a href="#" className="legalLink">Cookies</a>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
