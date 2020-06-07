var express = require("express"),
	cState = require("../controllers/cState");

var router = express.Router();

router.get("/",cState.getStates);
router.get("/city/:id",cState.getCityForState);
router.get("/municipality/:id",cState.getMunicipalityForState);

module.exports = router;
