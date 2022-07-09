const express = require("express");
const router = express.Router();
const hostelController = require("../controller/hostels");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/hostels");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-hostel", hostelController.getAllHostel);
router.post("/hostel-by-location", hostelController.getHostelByLocation);
router.post("/hostel-by-price", hostelController.getHostelByPrice);
router.post("/wish-hostel", hostelController.getWishHostel);
router.post("/cart-hostel", hostelController.getCartHostel);

router.post("/add-hostel", upload.any(), hostelController.postAddHostel);
router.post("/edit-hostel", upload.any(), hostelController.postEditHostel);
router.post("/delete-hostel", hostelController.getDeleteHostel);
router.post("/single-hostel", hostelController.getSingleHostel);

router.post("/add-review", hostelController.postAddReview);
router.post("/delete-review", hostelController.deleteReview);

module.exports = router;
