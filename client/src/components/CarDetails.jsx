import React from 'react'
import { useState } from 'react';
import { Calendar, Users, Fuel, Settings, MapPin } from 'lucide-react';

export default function CarDetails() {
    const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');


   const handleBookNow = () => {
    if (!pickupDate || !returnDate) {
      alert('Please select both pickup and return dates');
      return;
    }
    alert('Booking request submitted!');
  };


  const styles = {
  container: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px',
    gap: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff',

    
  },
  leftSection: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  carInfo: {
    marginBottom: '32px',
  },
  carTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },
  carSubtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0',
  },
  featuresContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '40px',
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    textAlign: 'center',
  },
  featureIcon: {
    marginBottom: '12px',
  },
  featureText: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    borderTop: '1px solid #e5e5e5',
    paddingTop: '24px',
  },
  descriptionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0',
  },
  rightSection: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bookingCard: {
    width: '100%',
    maxWidth: '320px',
    padding: '24px',
    border: '1px solid #e5e5e5',
    borderRadius: '16px',
    backgroundColor: '#fff',
    height: 'fit-content',
  },
  priceSection: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '32px',
  },
  price: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  perDay: {
    fontSize: '16px',
    color: '#666',
  },
  dateSection: {
    marginBottom: '24px',
  },
  dateField: {
    marginBottom: '20px',
  },
  dateLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    marginBottom: '8px',
  },
  dateInput: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  bookButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '16px',
  },
  noCreditCard: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    margin: '0',
  },
};




  return (
    <div>
      <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="BMW X5" 
            style={styles.carImage}
          />
        </div>
        
        <div style={styles.carInfo}>
          <h1 style={styles.carTitle}>BMW X5</h1>
          <p style={styles.carSubtitle}>SUV • 2006</p>
        </div>

        <div style={styles.featuresContainer}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>
              <Users size={20} color="#666" />
            </div>
            <span style={styles.featureText}>4 Seats</span>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>
              <Fuel size={20} color="#666" />
            </div>
            <span style={styles.featureText}>Hybrid</span>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>
              <Settings size={20} color="#666" />
            </div>
            <span style={styles.featureText}>Semi-Automatic</span>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>
              <MapPin size={20} color="#666" />
            </div>
            <span style={styles.featureText}>New York</span>
          </div>
        </div>

        <div style={styles.descriptionSection}>
          <h3 style={styles.descriptionTitle}>Description</h3>
          <p>The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.</p>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.bookingCard}>
          <div style={styles.priceSection}>
            <span style={styles.price}>$300</span>
            <span style={styles.perDay}>per day</span>
          </div>

          <div style={styles.dateSection}>
            <div style={styles.dateField}>
              <label style={styles.dateLabel}>Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                style={styles.dateInput}
                placeholder="dd-mm-yyyy"
              />
            </div>

            <div style={styles.dateField}>
              <label style={styles.dateLabel}>Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                style={styles.dateInput}
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>

          <button style={styles.bookButton} onClick={handleBookNow}>
            Book Now
          </button>

          <p style={styles.noCreditCard}>No credit card required to reserve</p>
        </div>
      </div>
    </div>
    </div>
  )
}
