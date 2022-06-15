const Hostel = require("../models/Hostel.js");
const Room = require("../models/Room.js");
const Booking = require("../models/Booking.js");

//Create new Booking
exports.newBooking = async (req, res, next) => {
    const {
        hostel_id,
        room, checkInDate, checkOutDate, Numberofroom,Numberofadult,Numberofchildren,
         daysOfStay, paymentInfo,totalPrice
    } = req.body;
    try{
    const booking = await Booking.create({
        checkInDate,
        checkOutDate,
        paymentInfo,
        paidAt: Date.now(),
        totalPrice,
    });
  
   
 
    res.status(201).json(booking);
}    
    catch (err) {
        next(err);
      }
}

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

  




