const Hostel = require("../models/Hostel.js");
const Room = require("../models/Room.js");
const Booking = require("../models/Booking.js");

//Create new Booking
exports.newBooking = async (req, res, next) => {
    const newbooking = new Booking(req.body)
    try{
    await newbooking.save();
    res.status(201).json(newbooking);
}    
    catch (err) {
        next(err);
      }
}

exports.updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

exports.getBooking = async (req, res, next) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  };
  exports.getBookings = async (req, res, next) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (err) {
      next(err);
    }
  };

  




