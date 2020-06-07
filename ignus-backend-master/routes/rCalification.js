var express = require("express"),
	cCalification = require("../controllers/cCalification");

var router = express.Router();

router.get("/",cCalification.getCalificationsAll);
router.post("/",cCalification.addCalification);
router.get("/:id",cCalification.getCalification);
router.put("/:id",cCalification.updateCalification);
router.delete("/:id",cCalification.deleteCalification);

module.exports = router;