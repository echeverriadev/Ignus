var express = require("express"),
	cProperty = require("../controllers/cProperty");

var router = express.Router();

router.get("/match",cProperty.matchTwoProperties);

router.get("/",cProperty.getPropertiesAll);
router.get("/catalogue",cProperty.getCatalogue);
router.get("/:id",cProperty.getProperty);
router.post("/pending", cProperty.addPendingProperty);
router.post("/transaction/:id", cProperty.addTransaction);
router.put("/:id", cProperty.updateProperty);
router.put("/publication/:transactionId", cProperty.postPublication);
router.get("/client/preference/:userId",cProperty.getPropertyDesiredPreferencesClient);




module.exports = router;
