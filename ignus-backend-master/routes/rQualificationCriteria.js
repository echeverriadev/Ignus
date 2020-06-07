var express = require("express"),
	cQualificationCriteria = require("../controllers/cQualificationCriteria");

var router = express.Router();

router.get("/",cQualificationCriteria.getQualificationCriterias);
router.post("/",cQualificationCriteria.addQualificationCriteria);
router.put("/:id",cQualificationCriteria.updateQualificationCriteria);
router.delete("/:id",cQualificationCriteria.deleteQualificationCriteria);

module.exports = router;
