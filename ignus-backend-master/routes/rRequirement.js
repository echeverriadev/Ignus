var express = require("express"),
	cRequirement = require("../controllers/cRequirement");

var router = express.Router();

router.get("/",cRequirement.getRequirements);
router.post("/",cRequirement.addRequirement);
router.put("/:id",cRequirement.updateRequirement);
router.delete("/:id",cRequirement.deleteRequirement);

module.exports = router;
