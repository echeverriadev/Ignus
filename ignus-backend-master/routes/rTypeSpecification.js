var express = require("express"),
	cTypeSpecification = require("../controllers/cTypeSpecification");

var router = express.Router();

router.get("/",cTypeSpecification.getTypeSpecificationsAll);
router.post("/",cTypeSpecification.addTypeSpecification);
router.get("/:id",cTypeSpecification.getTypeSpecification);
router.put("/:id",cTypeSpecification.updateTypeSpecification);
router.delete("/:id",cTypeSpecification.deleteTypeSpecification);

module.exports = router;

