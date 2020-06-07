var express = require("express"),
	cContact = require("../controllers/cContact");

var router = express.Router();

router.get("/",cContact.getContactsAll);
router.get("/:id",cContact.getContact);
router.post("/", cContact.addContact);
router.put("/respond/:id", cContact.respondContact);
router.delete("/:contactId", cContact.deleteContact);

module.exports = router;
