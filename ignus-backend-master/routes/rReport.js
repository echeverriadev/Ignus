var express = require("express"),
	cReport = require("../controllers/cReport");

var router = express.Router();

router.get("/request",cReport.requestByTypeServices);
router.get("/appointments",cReport.appointmentsReport);
router.get("/service",cReport.typeServiceReport);
router.get("/incidence",cReport.incidenceReport);
router.get("/contact",cReport.contactReport);
router.get("/transaction",cReport.transactionReport);
router.get("/client", cReport.clientsReport);

// Structure reports
router.get("/structure/", cReport.getClientsWithoutRequest);

module.exports = router;