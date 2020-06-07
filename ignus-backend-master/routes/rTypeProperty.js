var express = require("express"),
	cTypeProperty = require("../controllers/cTypeProperty");

var router = express.Router();

router.get("/",cTypeProperty.getTypePropertysAll);
router.post("/",cTypeProperty.addTypeProperty);
router.get("/:id",cTypeProperty.getTypeProperty);
router.put("/:id",cTypeProperty.updateTypeProperty);
router.delete("/:id",cTypeProperty.deleteTypeProperty);
router.get("/specification/:id",cTypeProperty.getSpecificationsForTypeProperty);

module.exports = router;
