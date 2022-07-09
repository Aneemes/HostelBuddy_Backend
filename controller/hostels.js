const hostelModel = require("../models/hostels");
const fs = require("fs");
const path = require("path");

class Hostel {
  // Delete Image from uploads -> hostels folder
  static deleteImages(images, mode) {
    var basePath = path.resolve(__dirname + '../../') + '/public/uploads/hostels/';
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = ''
      if (mode == 'file') {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
    }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllHostel(req, res) {
    try {
      let Hostels = await hostelModel
        .find({})
        .populate("pLocation", "_id cName")
        .sort({ _id: -1 });
      if (Hostels) {
        return res.json({ Hostels });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddHostel(req, res) {
    let {
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pLocation,
      pOffer,
      pStatus,
    } = req.body;
    let images = req.files;
    // Validation
    if (
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pLocation |
      !pOffer |
      !pStatus
    ) {
      Hostel.deleteImages(images, 'file');
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
      Hostel.deleteImages(images, 'file');
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    }
    // Validate Images
    else if (images.length !== 2) {
      Hostel.deleteImages(images, 'file');
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newHostel = new hostelModel({
          pImages: allImages,
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pLocation,
          pOffer,
          pStatus,
        });
        let save = await newHostel.save();
        if (save) {
          return res.json({ success: "Hostel created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditHostel(req, res) {
    let {
  
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pLocation,
      pOffer,
      pStatus,
      pImages,
    } = req.body;
    let editImages = req.files;

    // Validate other fileds
    if (
      
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pLocation |
      !pOffer |
      !pStatus
    ) {
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    } 
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
      Hostel.deleteImages(editImages, 'file');
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      let editData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pLocation,
        pOffer,
        pStatus,
      }
      if (editImages.length == 2) {
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        }
        editData = {...editData, pImages: allEditImages};
        Hostel.deleteImages(pImages.split(','), 'string');
      }
      try {
        let editHostel = hostelModel.findByIdAndUpdate(pId, editData);
        editHostel.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Hostel edit successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteHostel(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteHostelObj = await hostelModel.findById(pId);
        let deleteHostel = await hostelModel.findByIdAndDelete(pId);
        if (deleteHostel) {
          // Delete Image from uploads -> hostels folder
          Hostel.deleteImages(deleteHostelObj.pImages, 'string');
          return res.json({ success: "Hostel deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleHostel(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleHostel = await hostelModel
          .findById(pId)
          .populate("pLocation", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleHostel) {
          return res.json({ Hostel: singleHostel });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getHostelByLocation(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let hostels = await hostelModel
          .find({ pLocation: catId })
          .populate("pLocation", "cName");
        if (hostels) {
          return res.json({ Hostels: hostels });
        }
      } catch (err) {
        return res.json({ error: "Search hostel wrong" });
      }
    }
  }

  async getHostelByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let hostels = await hostelModel
          .find({ pPrice: { $lt: price } })
          .populate("pLocation", "cName")
          .sort({ pPrice: -1 });
        if (hostels) {
          return res.json({ Hostels: hostels });
        }
      } catch (err) {
        return res.json({ error: "Filter hostel wrong" });
      }
    }
  }

  async getWishHostel(req, res) {
    let { hostelArray } = req.body;
    if (hostelArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishHostels = await hostelModel.find({
          _id: { $in: hostelArray },
        });
        if (wishHostels) {
          return res.json({ Hostels: wishHostels });
        }
      } catch (err) {
        return res.json({ error: "Filter hostel wrong" });
      }
    }
  }

  async getCartHostel(req, res) {
    let { hostelArray } = req.body;
    if (hostelArray.length === 0) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartHostels = await hostelModel.find({
          _id: { $in: hostelArray },
        });
        if (cartHostels) {
          return res.json({ Hostels: cartHostels });
        }
      } catch (err) {
        return res.json({ error: "Cart hostel wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      let checkReviewRatingExists = await hostelModel.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: "Your already reviewd the hostel" });
          } else {
            try {
              let newRatingReview = hostelModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              });
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thanks for your review" });
              });
            } catch (err) {
              return res.json({ error: "Cart hostel wrong" });
            }
          }
        });
      } else {
        try {
          let newRatingReview = hostelModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thanks for your review" });
          });
        } catch (err) {
          return res.json({ error: "Cart hostel wrong" });
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let reviewDelete = hostelModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ success: "Your review is deleted" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const hostelController = new Hostel();
module.exports = hostelController;
