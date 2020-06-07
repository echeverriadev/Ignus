var express = require("express"),
	cTypeCalification = require("../controllers/cTypeCalification");

var router = express.Router();

router.get("/",cTypeCalification.getTypeCalificationsAll);
router.post("/",cTypeCalification.addTypeCalification);
router.get("/:id",cTypeCalification.getTypeCalification);
router.put("/:id",cTypeCalification.updateTypeCalification);
router.delete("/:id",cTypeCalification.deleteTypeCalification);

module.exports = router;