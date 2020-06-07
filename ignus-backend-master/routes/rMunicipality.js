var express = require("express"),
	cMunicipality = require("../controllers/cMunicipality");

var router = express.Router();

router.get("/parish/:id",cMunicipality.getParishForMunicipality);

module.exports = router;
