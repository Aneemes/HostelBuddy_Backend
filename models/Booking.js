const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({

    hostel: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Hostel"
    },

    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },


    totalPrice: {
        type: Number,
        required: true,
    },


    paymentInfo: {
      id: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },

    paidAt: {
        type: Date,
    },
    status: {
        type: String,
        default: "pending"
    }


});

module.exports = mongoose.model("Booking", BookingSchema)