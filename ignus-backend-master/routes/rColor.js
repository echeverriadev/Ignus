var express = require("express"),
	cColor = require("../controllers/cColor");

var router = express.Router();

router.get("/",cColor.getAllsColor);
router.post("/",cColor.addColor);
router.get("/:id",cColor.getColor);
router.put("/:id",cColor.updateColor);
router.delete("/:id",cColor.destroyColor);

module.exports = router;