var express = require("express"),
	cInspection = require("../controllers/cInspection");

var router = express.Router();

router.get("/",cInspection.getInspections);
router.post("/",cInspection.addInspection);
router.put("/:id",cInspection.updateInspection);
router.delete("/:id",cInspection.deleteInspection);

module.exports = router;
