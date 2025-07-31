import React, { useState } from 'react';
import { Upload, Camera, DollarSign, Calendar, MapPin, Car, Users, Fuel, Settings } from 'lucide-react';

const ListCar = () => {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    year: '',
    category: '',
    seats: '',
    transmission: '',
    fuelType: '',
    location: '',
    dailyRate: '',
    availability: '',
    description: '',
    images: []
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).slice(0, 5); // Max 5 images
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...fileArray].slice(0, 5)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Car listing submitted successfully!');
    console.log('Form data:', formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>List Your Car</h1>
        <p style={styles.subtitle}>Earn money by renting out your car to trusted drivers</p>
      </div>

      <div style={styles.form}>
        {/* Car Images Upload */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Car Photos</h3>
          <p style={styles.sectionSubtitle}>Upload up to 5 high-quality photos of your car</p>
          
          <div 
            style={{
              ...styles.uploadArea,
              ...(dragActive ? styles.uploadAreaActive : {})
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div style={styles.uploadContent}>
              <Camera size={48} color="#9ca3af" />
              <p style={styles.uploadText}>
                Drag and drop photos here, or <span style={styles.uploadLink}>browse</span>
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                style={styles.hiddenInput}
              />
            </div>
          </div>

          {formData.images.length > 0 && (
            <div style={styles.imagePreview}>
              {formData.images.map((file, index) => (
                <div key={index} style={styles.previewItem}>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${index + 1}`}
                    style={styles.previewImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Car Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Car Details</h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Make</label>
              <input
                type="text"
                name="carMake"
                value={formData.carMake}
                onChange={handleInputChange}
                placeholder="e.g., Toyota"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Model</label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleInputChange}
                placeholder="e.g., Corolla"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Year</option>
                {[...Array(30)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Category</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="convertible">Convertible</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
              </select>
            </div>
          </div>
        </div>

        {/* Car Features */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Car Features</h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Users size={16} style={styles.labelIcon} />
                Number of Seats
              </label>
              <select
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Seats</option>
                <option value="2">2 Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
                <option value="8">8+ Seats</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Settings size={16} style={styles.labelIcon} />
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Fuel size={16} style={styles.labelIcon} />
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <MapPin size={16} style={styles.labelIcon} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., New York"
                style={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Pricing & Availability */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Pricing & Availability</h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <DollarSign size={16} style={styles.labelIcon} />
                Daily Rate
              </label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleInputChange}
                placeholder="300"
                style={styles.input}
                min="1"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Calendar size={16} style={styles.labelIcon} />
                Available From
              </label>
              <input
                type="date"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Description</h3>
          <p style={styles.sectionSubtitle}>Tell renters about your car's condition, special features, or any important details</p>
          
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your car, its condition, any special features, maintenance history, or house rules for renters..."
            style={styles.textarea}
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <div style={styles.submitSection}>
          <button onClick={handleSubmit} style={styles.submitButton}>
            List My Car
          </button>
          <p style={styles.submitNote}>
            Your listing will be reviewed and approved within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0',
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0',
  },
  uploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  uploadAreaActive: {
    borderColor: '#2563eb',
    backgroundColor: '#f0f9ff',
  },
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  uploadText: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0',
  },
  uploadLink: {
    color: '#2563eb',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  imagePreview: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '12px',
    marginTop: '16px',
  },
  previewItem: {
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  labelIcon: {
    color: '#6b7280',
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '20px',
  },
  submitButton: {
    padding: '16px 32px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    minWidth: '200px',
  },
  submitNote: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0',
    textAlign: 'center',
  },
};

export default ListCar;