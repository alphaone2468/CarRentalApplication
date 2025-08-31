import React, { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch('http://localhost:5000/api/bookings/user/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setBookings(data);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const getStatusClasses = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium lowercase";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-red-50 text-red-600 border border-red-200`;
      case 'confirmed':
        return `${baseClasses} bg-blue-50 text-blue-600 border border-blue-200`;
      case 'completed':
        return `${baseClasses} bg-green-50 text-green-600 border border-green-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-600 border border-gray-200`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-5 py-5 md:py-10 font-sans bg-white min-h-screen">
      <div className="mb-6 md:mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
          My Bookings
        </h1>
        <p className="text-base md:text-lg text-gray-500">
          View and manage your all car bookings
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="flex flex-col md:flex-row p-4 md:p-6 border border-gray-200 rounded-2xl bg-white shadow-sm gap-4 md:gap-6"
          >
            {/* Left Section - Car Image and Info */}
            <div className="flex gap-4 items-center md:items-start flex-none">
              <div className="w-24 h-16 md:w-30 md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={booking.carId.images} 
                  alt={booking.carName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  {booking.carId.model}
                </h3>
                <p className="text-sm text-gray-500">
                  {booking.carDetails}
                </p>
              </div>
            </div>

            {/* Middle Section - Booking Details */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
              <div className="flex items-center justify-between md:justify-start gap-3 flex-wrap">
                <span className="text-base font-semibold text-gray-900">
                  Booking #{booking.id}
                </span>
                <span className={getStatusClasses(booking.status)}>
                  {booking.status}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex-shrink-0">
                    <Calendar size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-xs font-medium text-gray-500">
                      Rental Period
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {booking.startDate.slice(0, 10)} to {booking.endDate.slice(0, 10)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex-shrink-0">
                    <MapPin size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="text-xs font-medium text-gray-500">
                      Pick-up Location
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {booking.pickupLocation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Price and Date */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 flex-none w-full md:w-auto">
              <div className="flex flex-col items-start md:items-end gap-1">
                <span className="text-xs font-medium text-gray-500">
                  Total Price
                </span>
                <span className="text-xl md:text-2xl font-bold text-blue-600">
                  {booking.totalPrice}
                </span>
              </div>
              <p className="text-xs text-gray-400 self-end md:self-auto">
                Booked on {booking.bookedDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}