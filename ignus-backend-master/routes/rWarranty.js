var express = require("express"),
	cWarranty = require("../controllers/cWarranty");

var router = express.Router();

router.get("/",cWarranty.getAllWarrantys);
router.post("/",cWarranty.addWarranty);
router.get("/:id",cWarranty.getWarranty);
router.put("/:id",cWarranty.updateWarranty);
router.delete("/:id",cWarranty.deleteWarranty);

module.exports = router;