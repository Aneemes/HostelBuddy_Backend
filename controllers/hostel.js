const Hostel = require("../models/Hostel.js");
const Room = require("../models/Room.js");
const { createError } = require("../utils/error.js")

exports.createHostel = async (req, res, next) => {
    const newHostel = new Hostel(req.body);
    try {
      await newHostel.save();
      res.status(200).json("Hostel has been created.");
    } catch (err) {
       return next(createError(400, "Validation failed! Check input fields"));
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

// exports.deleteHostel = async(req, res) => {
//   let hId = req.params.id;
//   if (!hId) {
//     return res.json({ error: "All filled must be required" });
//   } else {
//     try {
//       let deleteHostelObj = await Hostel.findById(hId);
//       let deleteHostel = await Hostel.findByIdAndDelete(hId);
//       if (deleteHostel) {
//         // Delete Image from uploads -> products folder
//         // Product.deleteImages(deleteProductObj.pImages, 'string');
//         return res.json({ success: "hostel deleted successfully" });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hostel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
exports.countByType = async (req, res, next) => {
  try {
    const hostelCount = await Hostel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hostel.countDocuments({ type: "apartment" });
    const resortCount = await Hostel.countDocuments({ type: "resort" });
    const villaCount = await Hostel.countDocuments({ type: "villa" });
    const cabinCount = await Hostel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hostel", count: hostelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.updateHostel = async (req, res, next) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHostel);
  } catch (err) {
    next(err);
  }
};

exports.deleteHostel = async (req, res, next) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hostel has been deleted.");
  } catch (err) {
    next(err);
  }
};