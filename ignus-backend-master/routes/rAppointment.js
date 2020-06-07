var express = require("express"),
	cAppointment = require("../controllers/cAppointment");

var router = express.Router();

router.get("/",cAppointment.getAppointmentsAll);
router.get("/schedule",cAppointment.getScheduleByUserId);
router.post("/",cAppointment.addAppointment);
router.get("/:id",cAppointment.getAppointment);
router.put("/:id",cAppointment.updateAppointment);
router.delete("/:id",cAppointment.deleteAppointment);

module.exports = router;