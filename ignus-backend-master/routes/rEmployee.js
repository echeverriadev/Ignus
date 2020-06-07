var express = require("express"),
	cEmployee = require("../controllers/cEmployee");

var router = express.Router();

router.get("/",cEmployee.getEmployeeAll);
router.get("/:id", cEmployee.getEmployee);
router.get("/transaction/:userId",cEmployee.getAllTransactionsEmployee);
router.delete("/:user_id", cEmployee.destroyEmployee);
router.put("/:user_id", cEmployee.updateEmployee);
router.get("/count/client/:employeeId",cEmployee.getCountClientsByEmployee);

module.exports = router;
