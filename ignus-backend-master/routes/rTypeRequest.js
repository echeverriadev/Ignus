var express = require("express"),
	cTypeRequest = require("../controllers/cTypeRequest");

var router = express.Router();

router.get("/",cTypeRequest.getTypeRequests);
router.post("/",cTypeRequest.addTypeRequest);
router.put("/:id",cTypeRequest.updateTypeRequest);
router.delete("/:id",cTypeRequest.deleteTypeRequest);

module.exports = router;
