var express = require("express"),
	cTransaction = require("../controllers/cTransaction");

var router = express.Router();

//router.get("/",cTransaction.getTransactionsAll);
router.get("/count/:userId",cTransaction.getCountTransactionsByUserId);
router.get("/services/:userId",cTransaction.getServicesTransactionsEmployee);
router.get("/",cTransaction.getTransactionsAllByUserId);
router.get("/:transactionId",cTransaction.getTransactionById);
router.put("/requirement/approve/:transactionId",cTransaction.approveRequirementByTransactionId);
router.put("/requirement/reject/:transactionId",cTransaction.rejectRequirementByTransactionId);
router.put("/requirement/upload/:transactionId",cTransaction.uploadRequirementByTransactionId);
router.put("/activity/approve/:transactionId",cTransaction.approveActivityByTransactionId);
router.put("/activity/reject/:transactionId",cTransaction.rejectActivityByTransactionId);
router.put("/reserve/:transactionId",cTransaction.reserveTransaction);
router.put("/removeReserve/:transactionId",cTransaction.removeReservationTransaction);



module.exports = router;


