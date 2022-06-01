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

exports.getHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    res.status(200).json(hostel);
  } catch (err) {
    next(err);
  }
};

exports.getHostels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hostels = await Hostel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hostels);
  } catch (err) {
    next(err);
  }
};

exports.getHostelRooms = async (req, res, next) => {
  try {
    const hotel = await Hostel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};