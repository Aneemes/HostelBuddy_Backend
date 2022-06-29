const mongoose = require('mongoose');
const HostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default:"apartment"
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
    min: 0,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  lat:{
    type:Number,

  },
  lon:{
    type:Number,

  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Hostel", HostelSchema)