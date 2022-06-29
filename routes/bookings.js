const express = require("express");
const {
    newBooking, updateRoomBooking,getBooking, getBookings, updateBooking
}= require("../controllers/booking.js");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();


router.post("/", verifyUser, newBooking);
// router
//   .put("/admin/booking/:userid",verifyAdmin,updateRoomBooking);

//UPDATE
router.put("/:id", verifyAdmin, updateBooking);

//GET booking
router.get("/find/:id", getBooking);

//GET ALL bookings
router.get("/", verifyAdmin, getBookings);

module.exports = router;
