var express = require("express"),
	cTypeAppointment = require("../controllers/cTypeAppointment");

var router = express.Router();

router.get("/",cTypeAppointment.getAllTypesAppointment);
router.get("/:id",cTypeAppointment.getTypeAppointment);
router.post("/",cTypeAppointment.addTypeAppointment);
router.put("/:id",cTypeAppointment.updateTypeAppointment);
router.delete("/:id",cTypeAppointment.deleteTypeAppointment);

module.exports = router;
