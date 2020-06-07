var express = require("express"),
	cClient = require("../controllers/cClient");

var router = express.Router();

router.get("/",cClient.getClients);
router.get("/:id",cClient.getClient);
router.get("/request/:userId",cClient.getRequestClientAll);
router.get("/transaction/:userId",cClient.getAllTransactionsClient);
router.delete("/:user_id", cClient.destroyClient);
router.put("/:user_id", cClient.updateClient);
router.put("/specifications/:id", cClient.addSpecificationsForClient);
router.put("/preference/:clientId", cClient.updatePreferencesByClientId);




module.exports = router;
