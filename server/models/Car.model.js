// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images:{
    type:String,
    required:true
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  features: {
    seater: {
      type: Number,
      required: true
    },
    driveType: {
      type: String,
      enum: ['hybrid', 'electric', 'petrol', 'diesel'],
      required: true
    },
    transmission: {
      type: String,
      enum: ['automatic', 'semi-automatic', 'manual'],
      required: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
x