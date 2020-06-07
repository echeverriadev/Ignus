var express = require("express"),
	cTypeEmployee = require("../controllers/cTypeEmployee");

var router = express.Router();

router.get("/",cTypeEmployee.getAllTypesEmployee);

module.exports = router;
