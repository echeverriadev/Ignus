var express = require("express"),
	cPromotion = require("../controllers/cPromotion");

var router = express.Router();

router.get("/",cPromotion.getAllPromotions);
router.post("/",cPromotion.createPromotion);
router.get("/:id",cPromotion.getPromotion);
router.put("/:id",cPromotion.updatePromotion);
router.delete("/:id",cPromotion.deletePromotion);
router.put("/properties/:id",cPromotion.addPropertiesToPromotion);
router.put("/specifications/:id",cPromotion.addSpecificationToPromotion);
router.put("/activate/:id",cPromotion.activatePromotion);
router.put("/remove/:id",cPromotion.removePromotion);

module.exports = router;