var express = require("express"),
	cSpecification = require("../controllers/cSpecification");

var router = express.Router();

router.get("/",cSpecification.getSpecificationsAll);
router.get("/:id",cSpecification.getSpecification);
router.post("/",cSpecification.addSpecification);
router.put("/:id",cSpecification.updateSpecification);
router.delete("/:id",cSpecification.deleteSpecification);

module.exports = router;
