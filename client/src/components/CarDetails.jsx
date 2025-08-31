import React, { useEffect } from 'react'
import { useState } from 'react';
import { Calendar, Users, Fuel, Settings, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function CarDetails() {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);



  const [carData, setCarData] = useState({});


  useEffect(() => {
    const fetchCarDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setCarData(data);
      setPickupLocation(data.pickupLocation);
      setLoading(false);
    };

    fetchCarDetails();
  }, []);

  // Mock data - in real app, these would come from props or API

  const userId = '507f1f77bcf86cd799439012'; // Mock user ID - in real app, get from auth context

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * pricePerDay;
  };

  const handleBookNow = async () => {
    // Validation
    if (!pickupDate || !returnDate) {
      alert('Please select both pickup and return dates');
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      alert('Return date must be after pickup date');
      return;
    }

    if (!pickupLocation.trim()) {
      alert('Please enter a pickup location');
      return;
    }

    setIsSubmitting(true);

    // Prepare booking data according to Mongoose schema
    const bookingData = {
      carId: carData._id,
      startDate: new Date(pickupDate).toISOString(),
      endDate: new Date(returnDate).toISOString(),
      totalPrice: calculateTotalPrice(pickupDate, returnDate, carData.price),
      pickupLocation: pickupLocation,
      status: 'pending' // Default status as per schema
    };

    try {
      // In a real application, you would make an API call here
      // Example API call:
      
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      console.log('Booking response:', result);
      
      
      setPickupDate('');
      setReturnDate('');
      setPickupLocation('New York');
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = calculateTotalPrice(pickupDate, returnDate, carData.pricePerDay);

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
    totalPriceSection: {
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    totalPriceLabel: {
      fontSize: '14px',
      color: '#666',
      margin: '0 0 4px 0',
    },
    totalPrice: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2563eb',
      margin: '0',
    },
    bookButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: isSubmitting ? '#94a3b8' : '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
    loading ? <div style={{textAlign:"center", marginTop:"100px"}}><h2>Loading...</h2></div> 
    :

    <div>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <div style={styles.imageContainer}>
            <img 
              src={carData.images}
              alt="BMW X5" 
              style={styles.carImage}
            />
          </div>
          
          <div style={styles.carInfo}>
            <h1 style={styles.carTitle}>{carData.brand}</h1>
            <p style={styles.carSubtitle}>{carData.model} • {carData.year}</p>
          </div>

          <div style={styles.featuresContainer}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>
                <Users size={20} color="#666" />
              </div>
              <span style={styles.featureText}>{carData.features.seater} Seats</span>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>
                <Fuel size={20} color="#666" />
              </div>
              <span style={styles.featureText}>{carData.features.driveType}</span>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>
                <Settings size={20} color="#666" />
              </div>
              <span style={styles.featureText}>{carData.features.transmission}</span>
            </div>
            
            <div style={styles.feature}>
              <div style={styles.featureIcon}>
                <MapPin size={20} color="#666" />
              </div>
              <span style={styles.featureText}>{carData.pickupLocation}</span>
            </div>
          </div>

          <div style={styles.descriptionSection}>
            <h3 style={styles.descriptionTitle}>Description</h3>
            <p>{carData.description}</p>
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.bookingCard}>
            <div style={styles.priceSection}>
              <span style={styles.price}>${carData.price}</span>
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
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={styles.dateField}>
                <label style={styles.dateLabel}>Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={styles.dateInput}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={styles.dateField}>
                <label style={styles.dateLabel}>Pickup Location</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={styles.dateInput}
                  placeholder="Enter pickup location"
                />
              </div>
            </div>

            {totalPrice > 0 && (
              <div style={styles.totalPriceSection}>
                <p style={styles.totalPriceLabel}>Total Price</p>
                <p style={styles.totalPrice}>${totalPrice}</p>
              </div>
            )}

            <button 
              style={styles.bookButton} 
              onClick={handleBookNow}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </button>

            <p style={styles.noCreditCard}>No credit card required to reserve</p>
          </div>
        </div>
      </div>
    </div>
  )
}