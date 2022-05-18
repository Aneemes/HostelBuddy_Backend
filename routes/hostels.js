const express = require("express");
const { createHostel } =require ("../controllers/hostel.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();


router.post("/", verifyAdmin, createHostel);

module.exports = router