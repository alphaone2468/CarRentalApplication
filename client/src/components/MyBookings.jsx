import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function MyBookings() {
    const [bookings] = useState([
    {
      id: 1,
      carName: 'Toyota Corolla',
      carDetails: '2021 • Sedan • Los Angeles',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'pending',
      rentalPeriod: '2025-07-30 To 2025-07-24',
      pickupLocation: 'Los Angeles',
      totalPrice: '$780',
      bookedDate: '2025-07-28'
    }
  ]);


  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return {
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca'
        };
      case 'confirmed':
        return {
          backgroundColor: '#f0f9ff',
          color: '#0284c7',
          border: '1px solid #bae6fd'
        };
      case 'completed':
        return {
          backgroundColor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0'
        };
      default:
        return {
          backgroundColor: '#f9fafb',
          color: '#6b7280',
          border: '1px solid #e5e7eb'
        };
    }
  };



  return (
    <div>
      <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Bookings</h1>
        <p style={styles.subtitle}>View and manage your all car bookings</p>
      </div>

      <div style={styles.bookingsContainer}>
        {bookings.map((booking) => (
          <div key={booking.id} style={styles.bookingCard}>
            <div style={styles.leftSection}>
              <div style={styles.imageContainer}>
                <img 
                  src={booking.image} 
                  alt={booking.carName}
                  style={styles.carImage}
                />
              </div>
              
              <div style={styles.carInfo}>
                <h3 style={styles.carName}>{booking.carName}</h3>
                <p style={styles.carDetails}>{booking.carDetails}</p>
              </div>
            </div>

            <div style={styles.middleSection}>
              <div style={styles.bookingHeader}>
                <span style={styles.bookingId}>Booking #{booking.id}</span>
                <span 
                  style={{
                    ...styles.statusBadge,
                    ...getStatusStyle(booking.status)
                  }}
                >
                  {booking.status}
                </span>
              </div>

              <div style={styles.bookingDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailIcon}>
                    <Calendar size={16} color="#666" />
                  </div>
                  <div style={styles.detailContent}>
                    <span style={styles.detailLabel}>Rental Period</span>
                    <span style={styles.detailValue}>{booking.rentalPeriod}</span>
                  </div>
                </div>

                <div style={styles.detailItem}>
                  <div style={styles.detailIcon}>
                    <MapPin size={16} color="#666" />
                  </div>
                  <div style={styles.detailContent}>
                    <span style={styles.detailLabel}>Pick-up Location</span>
                    <span style={styles.detailValue}>{booking.pickupLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.rightSection}>
              <div style={styles.priceSection}>
                <span style={styles.priceLabel}>Total Price</span>
                <span style={styles.totalPrice}>{booking.totalPrice}</span>
              </div>
              <p style={styles.bookedDate}>Booked on {booking.bookedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}


const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 12px 0',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    margin: '0',
  },
  bookingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  bookingCard: {
    display: 'flex',
    padding: '24px',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    gap: '24px',
    alignItems: 'flex-start',
  },
  leftSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    flex: '0 0 auto',
  },
  imageContainer: {
    width: '120px',
    height: '80px',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  carInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  carName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  carDetails: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0',
  },
  middleSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bookingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  bookingId: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  bookingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  detailIcon: {
    marginTop: '2px',
    flexShrink: 0,
  },
  detailContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '14px',
    color: '#1a1a1a',
    fontWeight: '500',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    flex: '0 0 auto',
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  priceLabel: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2563eb',
  },
  bookedDate: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0',
  },
};