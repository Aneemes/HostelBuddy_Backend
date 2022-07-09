const { toTitleCase } = require("../config/function");
const locationModel = require("../models/locations");
const fs = require("fs");

class Location {
  async getAllLocation(req, res) {
    try {
      let Locations = await locationModel.find({}).sort({ _id: -1 });
      if (Locations) {
        return res.json({ Locations });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddLocation(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file.filename;
    const filePath = `../server/public/uploads/locations/${cImage}`;

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "All filled must be required" });
      });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkLocationExists = await locationModel.findOne({ cName: cName });
        if (checkLocationExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "Location already exists" });
          });
        } else {
          let newLocation = new locationModel({
            cName,
            cDescription,
            cStatus,
            cImage,
          });
          await newLocation.save((err) => {
            if (!err) {
              return res.json({ success: "Location created successfully" });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditLocation(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All filled must be required" });
    }
    try {
      let editLocation = locationModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      let edit = await editLocation.exec();
      if (edit) {
        return res.json({ success: "Location edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteLocation(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deletedLocationFile = await locationModel.findById(cId);
        const filePath = `../server/public/uploads/locations/${deletedLocationFile.cImage}`;

        let deleteLocation = await locationModel.findByIdAndDelete(cId);
        if (deleteLocation) {
          // Delete Image from uploads -> locations folder 
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Location deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const locationController = new Location();
module.exports = locationController;
