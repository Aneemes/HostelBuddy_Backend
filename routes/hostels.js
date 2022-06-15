const express = require("express");
const { 
    createHostel,
    getHostel,
    getHostels,
    getHostelRooms,
    countByCity,
    countByType,
    updateHostel,
    deleteHostel
 } =require ("../controllers/hostel.js");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();


router.post("/", verifyAdmin, createHostel);
//UPDATE
router.put("/:id", verifyAdmin, updateHostel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHostel);

//GET

router.get("/find/:id", getHostel);
//GET ALL

router.get("/", getHostels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHostelRooms);


module.exports = router