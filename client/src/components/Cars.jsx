import React from 'react'
import '../styles/Cars.css'
import { Users, Fuel, Settings, MapPin, Star } from "lucide-react";
import {useNavigate} from 'react-router-dom'

export default function Cars() {
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
    {
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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

  const navigate=useNavigate();
  return (
    <div>

        <div className="carsHeading">
            <div>
                <h1 className='tc carsHeadingText'>Available Cars</h1>
                <p className='tc carsListDescription'>Browse our selection of premium vehicles available for your next adventure</p>
            </div>
        </div>
          <h1 className='listHeading'>Pick From Available Models That Match Your Vibe</h1>
              <div className="container">
                <div className="grid">
                  {cars.map((car) => (
                    <div key={car.id} className="card">
                      <div className="imageContainer">
                        <img src={car.image} alt={car.name} className="carImage" onClick={()=>navigate("/car-details")} />
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



    </div>
  )
}
