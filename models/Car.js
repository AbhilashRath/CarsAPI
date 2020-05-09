const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
      },
    
      model: {
        type: String,
        required: true
      },
    
      seatingCapacity: {
        type: Number,
        required: true
      },
    
      rentPerDay: {
        type: Number,
        required: true
      },
    
      isBooked: {
        type: Boolean,
        default: false
      }
});

module.exports = mongoose.model('Cars',CarSchema);
