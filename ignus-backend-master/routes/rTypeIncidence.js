var express = require("express"),
	cTypeIncidence = require("../controllers/cTypeIncidence");

var router = express.Router();

router.get("/",cTypeIncidence.getAllTypesIncidence);
router.get("/:id",cTypeIncidence.getTypeIncidence);
router.post("/",cTypeIncidence.addTypeIncidence);
router.put("/:id",cTypeIncidence.updateTypeIncidence);
router.delete("/:id",cTypeIncidence.deleteTypeIncidence);

module.exports = router;
