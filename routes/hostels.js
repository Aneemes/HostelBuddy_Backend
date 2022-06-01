const express = require("express");
const { 
    createHostel,
    getHostel,
    getHostels,
    getHostelRooms
 } =require ("../controllers/hostel.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();


router.post("/", verifyAdmin, createHostel);


//GET

router.get("/find/:id", getHostel);
//GET ALL

router.get("/", getHostels);

router.get("/room/:id", getHostelRooms);

module.exports = router