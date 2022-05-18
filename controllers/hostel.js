const Hostel = require("../models/Hostel.js");
const Room = require("../models/Room.js");

exports.createHostel = async (req, res, next) => {
    const newHostel = new Hostel(req.body);
  
    try {
      const savedHostel = await newHostel.save();
      res.status(200).json(savedHostel);
    } catch (err) {
      next(err);
    }
  };