var express = require("express"),
	cTypeContact = require("../controllers/cTypeContact");

var router = express.Router();

router.get("/",cTypeContact.getTypeContactsAll);
router.post("/",cTypeContact.addTypeContact);
router.get("/:id",cTypeContact.getTypeContact);
router.put("/:id",cTypeContact.updateTypeContact);
router.delete("/:id",cTypeContact.deleteTypeContact);

module.exports = router;
