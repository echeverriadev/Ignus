var express = require("express"),
	cActivity = require("../controllers/cActivity");

var router = express.Router();

router.get("/",cActivity.getActivities);
router.post("/",cActivity.addActivity);
router.put("/:id",cActivity.updateActivity);
router.delete("/:id",cActivity.deleteActivity);

module.exports = router;
