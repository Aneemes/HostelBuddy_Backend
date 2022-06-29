const Contact = require("../models/Contact.js");
// Add contact message
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      message: "Admin contacted successfully!",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to contact with the admin!",
    });
  }
};
// Get a contact
exports.getContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find your message!",
    });
  }
};
// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get messages!",
    });
  }
};
// Edit contact
exports.updateContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update your message!",
    });
  }
};
// Delete a contact
exports.deleteContact = async (req, res) => {
  let contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Unable to locate your contact message!",
    });
  } else {
    await contact.remove();
    res.status(500).json({
      success: true,
      message: "Message Deleted!",
    });
  }
};