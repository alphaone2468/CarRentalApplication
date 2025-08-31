import React, { useState } from 'react';
import { Upload, Camera, DollarSign, Calendar, MapPin, Car, Users, Fuel, Settings } from 'lucide-react';

const ListCar = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    pickupLocation: '',
    description: '',
    seater: '',
    driveType: '',
    transmission: '',
    images: [],
    price: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }

    if (!formData.seater) {
      newErrors.seater = 'Number of seats is required';
    }

    if (!formData.driveType) {
      newErrors.driveType = 'Drive type is required';
    }

    if (!formData.transmission) {
      newErrors.transmission = 'Transmission type is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one car image is required';
    }

    // Optional: Description validation (minimum length)
    if (formData.description.trim() && formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-field');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Transform data to match the Car model schema
      const carData = {
        // userId will be set on the backend based on authenticated user
        images: formData.images[0], // Taking first image as string
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: formData.year,
        pickupLocation: formData.pickupLocation.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        features: {
          seater: parseInt(formData.seater),
          driveType: formData.driveType,
          transmission: formData.transmission
        }
      };

      console.log('Car data to be saved:', carData);
      
      // Here you would make API call to save the data
      let response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(carData)
      });

      response  = await response.json();
      console.log(response);
      
      // Reset form on success
      setFormData({
        brand: '',
        model: '',
        year: '',
        pickupLocation: '',
        description: '',
        seater: '',
        driveType: '',
        transmission: '',
        images: []
      });
      
    } catch (error) {
      console.error('Error submitting car listing:', error);
      alert('Error submitting listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          images: 'Please select a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          images: 'Image size should be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          images: [reader.result] // Store as base64 string to match model
        }));
        
        // Clear image error when valid image is uploaded
        if (errors.images) {
          setErrors(prev => ({
            ...prev,
            images: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto'
    },
    form: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    section: {
      marginBottom: '2.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    sectionSubtitle: {
      color: '#64748b',
      marginBottom: '1.5rem',
      fontSize: '0.9rem'
    },
    uploadArea: {
      border: '2px dashed #cbd5e1',
      borderRadius: '8px',
      padding: '3rem 2rem',
      textAlign: 'center',
      backgroundColor: '#f8fafc',
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative'
    },
    uploadContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    },
    uploadText: {
      color: '#64748b',
      fontSize: '1rem'
    },
    uploadLink: {
      color: '#3b82f6',
      fontWeight: '500',
      cursor: 'pointer'
    },
    hiddenInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer'
    },
    imagePreview: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    },
    previewItem: {
      position: 'relative'
    },
    previewImage: {
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '8px',
      border: '2px solid #e2e8f0'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    input: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none'
    },
    inputError: {
      padding: '0.75rem 1rem',
      border: '2px solid #ef4444',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none',
      backgroundColor: '#fef2f2'
    },
    select: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    selectError: {
      padding: '0.75rem 1rem',
      border: '2px solid #ef4444',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: '#fef2f2',
      cursor: 'pointer',
      outline: 'none'
    },
    textarea: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '1rem',
      resize: 'vertical',
      fontFamily: 'inherit',
      outline: 'none',
      width:"100%"
    },
    textareaError: {
      padding: '0.75rem 1rem',
      border: '2px solid #ef4444',
      borderRadius: '6px',
      fontSize: '1rem',
      resize: 'vertical',
      fontFamily: 'inherit',
      outline: 'none',
      backgroundColor: '#fef2f2'
    },
    uploadAreaError: {
      border: '2px dashed #ef4444',
      borderRadius: '8px',
      padding: '3rem 2rem',
      textAlign: 'center',
      backgroundColor: '#fef2f2',
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    submitSection: {
      textAlign: 'center',
      paddingTop: '2rem',
      borderTop: '1px solid #e5e7eb'
    },
    submitButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '1rem 2.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginBottom: '1rem',
      minWidth: '200px'
    },
    submitButtonDisabled: {
      backgroundColor: '#9ca3af',
      color: 'white',
      padding: '1rem 2.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'not-allowed',
      marginBottom: '1rem',
      minWidth: '200px'
    },
    submitNote: {
      color: '#6b7280',
      fontSize: '0.9rem'
    }
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
          <h3 style={styles.sectionTitle}>
            <Camera size={20} />
            Car Photos
          </h3>
          <p style={styles.sectionSubtitle}>Upload a high-quality photo of your car</p>
          
          <div 
            style={errors.images ? styles.uploadAreaError : styles.uploadArea}
            className={errors.images ? 'error-field' : ''}
          >
            <div style={styles.uploadContent}>
              <Camera size={48} color="#9ca3af" />
              <p style={styles.uploadText}>
                Drag and drop photo here, or <span style={styles.uploadLink}>browse</span>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                style={styles.hiddenInput}
              />
            </div>
          </div>

          {errors.images && (
            <div style={styles.errorText}>
              ⚠ {errors.images}
            </div>
          )}

          {formData.images.length > 0 && (
            <div style={styles.imagePreview}>
              <div style={styles.previewItem}>
                <img 
                  src={formData.images[0]} 
                  alt="Car preview"
                  style={styles.previewImage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Car Details */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <Car size={20} />
            Car Details
          </h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup} className={errors.brand ? 'error-field' : ''}>
              <label style={styles.label}>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="e.g., Toyota"
                style={errors.brand ? styles.inputError : styles.input}
                required
              />
              {errors.brand && (
                <div style={styles.errorText}>
                  ⚠ {errors.brand}
                </div>
              )}
            </div>

            <div style={styles.formGroup} className={errors.model ? 'error-field' : ''}>
              <label style={styles.label}>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="e.g., Corolla"
                style={errors.model ? styles.inputError : styles.input}
                required
              />
              {errors.model && (
                <div style={styles.errorText}>
                  ⚠ {errors.model}
                </div>
              )}
            </div>

            <div style={styles.formGroup} className={errors.year ? 'error-field' : ''}>
              <label style={styles.label}>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                style={errors.year ? styles.selectError : styles.select}
                required
              >
                <option value="">Select Year</option>
                {[...Array(30)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year.toString()}>{year}</option>;
                })}
              </select>
              {errors.year && (
                <div style={styles.errorText}>
                  ⚠ {errors.year}
                </div>
              )}
            </div>

            <div style={styles.formGroup} className={errors.pickupLocation ? 'error-field' : ''}>
              <label style={styles.label}>Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Mumbai"
                style={errors.pickupLocation ? styles.inputError : styles.input}
                required
              />
              {errors.pickupLocation && (
                <div style={styles.errorText}>
                  ⚠ {errors.pickupLocation}
                </div>
              )}
            </div>
          </div>
        </div>


            <div style={{...styles.formGroup , marginBottom: '1rem'}} className={errors.price ? 'error-field' : ''} >
              <label style={styles.label}>Cost per day</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 100"
                style={errors.price ? styles.inputError : styles.input}
                required
              />
              {errors.price && (
                <div style={styles.errorText}>
                  ⚠ {errors.price}
                </div>
              )}
            </div>

        {/* Car Features */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <Settings size={20} />
            Car Features
          </h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup} className={errors.seater ? 'error-field' : ''}>
              <label style={styles.label}>
                <Users size={16} style={{display: 'inline', marginRight: '0.25rem'}} />
                Number of Seats
              </label>
              <select
                name="seater"
                value={formData.seater}
                onChange={handleInputChange}
                style={errors.seater ? styles.selectError : styles.select}
                required
              >
                <option value="">Select Seats</option>
                <option value="2">2 Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
                <option value="8">8 Seats</option>
              </select>
              {errors.seater && (
                <div style={styles.errorText}>
                  ⚠ {errors.seater}
                </div>
              )}
            </div>

            <div style={styles.formGroup} className={errors.transmission ? 'error-field' : ''}>
              <label style={styles.label}>
                <Settings size={16} style={{display: 'inline', marginRight: '0.25rem'}} />
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                style={errors.transmission ? styles.selectError : styles.select}
                required
              >
                <option value="">Select Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
              {errors.transmission && (
                <div style={styles.errorText}>
                  ⚠ {errors.transmission}
                </div>
              )}
            </div>

            <div style={styles.formGroup} className={errors.driveType ? 'error-field' : ''}>
              <label style={styles.label}>
                <Fuel size={16} style={{display: 'inline', marginRight: '0.25rem'}} />
                Drive Type
              </label>
              <select
                name="driveType"
                value={formData.driveType}
                onChange={handleInputChange}
                style={errors.driveType ? styles.selectError : styles.select}
                required
              >
                <option value="">Select Drive Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
              {errors.driveType && (
                <div style={styles.errorText}>
                  ⚠ {errors.driveType}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Description</h3>
          <p style={styles.sectionSubtitle}>Tell renters about your car's condition, special features, or any important details</p>
          
          <div className={errors.description ? 'error-field' : ''}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your car, its condition, any special features, maintenance history, or house rules for renters..."
              style={errors.description ? styles.textareaError : styles.textarea}
              rows="5"
            />
            {errors.description && (
              <div style={styles.errorText}>
                ⚠ {errors.description}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.submitSection}>
          <button 
            type="submit" 
            onClick={handleSubmit}
            style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'List My Car'}
          </button>
          <p style={styles.submitNote}>
            Your listing will be reviewed and approved within 24 hours
          </p>
        </div>
              </div>
    </div>
  );
};

export default ListCar;