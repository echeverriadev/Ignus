var express = require("express"),
	cRequest = require("../controllers/cRequest");

var router = express.Router();

//deprecated
router.get("/pending",cRequest.getRequestsPendingAll);

router.get("/",cRequest.getRequestsAll);
router.get("/:requestId",cRequest.getRequestById);
router.get("/count/:userId",cRequest.getCountRequestsByUserId);
router.put("/pending/approve/:id",cRequest.approveRequest);
router.put("/pending/reject/:id",cRequest.rejectRequest);
router.post("/pending/",cRequest.addRequestPending);

module.exports = router;




