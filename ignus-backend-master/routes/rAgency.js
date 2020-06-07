var express = require("express"),
	cAgency = require("../controllers/cAgency");

var router = express.Router();

router.get("/",cAgency.getAgency);
router.get("/socialNetwork",cAgency.getSocialNetworkForAgency);
router.get("/logo",cAgency.getLogoForAgency);
router.get("/tables",cAgency.getTables);
router.get("/columns/:id",cAgency.getAttributes);
router.put("/:id", cAgency.updateAgency);
router.post("/",cAgency.addAgency);

module.exports = router;