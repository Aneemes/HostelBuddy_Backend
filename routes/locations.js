const express = require("express");
const router = express.Router();
const locationController = require("../controller/locations");
const multer = require("multer");
const { loginCheck } = require("../middleware/auth");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/locations");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-location", locationController.getAllLocation);
router.post(
  "/add-location",
  loginCheck,
  upload.single("cImage"),
  locationController.postAddLocation
);
router.post("/edit-location", loginCheck, locationController.postEditLocation);
router.post(
  "/delete-location",
  loginCheck,
  locationController.getDeleteLocation
);

module.exports = router;
