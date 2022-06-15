const express = require("express");
const {
    newBooking, updateRoomBooking,getBooking, getBookings
}= require("../controllers/booking.js");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();


router.post("/:userid", verifyUser, newBooking);
// router
//   .put("/admin/booking/:userid",verifyAdmin,updateRoomBooking);

//GET booking
router.get("/find/:id",verifyUser, getBooking);

//GET ALL bookings
router.get("/", verifyAdmin, getBookings);

module.exports = router;
