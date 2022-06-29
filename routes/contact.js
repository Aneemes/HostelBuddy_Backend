const express = require("express");
const {
    createContact, getContact,getAllContacts, updateContact, deleteContact
}= require("../controllers/contact.js");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

//create
router.post("/", createContact);


//GET ALL contacts
router.get("/", verifyAdmin, getAllContacts);

//get one
router.get("/:id",verifyUser, getContact);

//update
router.put("/:id", verifyAdmin, updateContact);

//delete
router.delete("/:id", verifyAdmin, deleteContact);

module.exports = router