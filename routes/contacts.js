const express = require("express");
const {
    createContact, getContact,getAllContacts, updateContact, deleteContact
}= require("../controller/contacts");
const router = express.Router();

//create
router.post("/", createContact);


//GET ALL contacts
router.get("/", getAllContacts);

//get one
router.get("/:id", getContact);

//update
router.put("/:id", updateContact);

//delete
router.delete("/:id", deleteContact);

module.exports = router