const contactModel = require("../models/contacts");
// Add contact message
exports.createContact = async (req, res) => {
  try {
    const contact = await contactModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Admin contacted successfully!",
      contact,
    });
  } catch (err) {
    console.log(err);
  }
};
// Get a contact
exports.getContact = async (req, res) => {
  try {
    let contact = await contactModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Unable to locate your contact message!",
      });
    } else {
      res.status(200).json({
        success: true,
        contact,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contact = await contactModel.find();
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (err) {
    console.log(err);
  }
};
// Edit contact
exports.updateContact = async (req, res) => {
  try {
    let contact = await contactModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Unable to locate your contact message!",
      });
    } else {
      (contactUpdated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body
      )),
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        };
      res.status(201).json({
        success: true,
        message: "Your message updated successfully!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// Delete a contact
exports.deleteContact = async (req, res) => {
  let contact = await contactModel.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Unable to locate your contact message!",
    });
  } else {
    await contact.remove();
    console.log(err);
  }
};