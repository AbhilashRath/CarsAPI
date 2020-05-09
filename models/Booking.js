const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Booking", BookingSchema);