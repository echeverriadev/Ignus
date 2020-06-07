var express = require("express"),
	cContract = require("../controllers/cContract");

var router = express.Router();

router.get("/",cContract.getAllContracts);
router.post("/",cContract.addContract);
router.get("/:id",cContract.getContract);
router.put("/:id",cContract.updateContract);
router.delete("/:id",cContract.deleteContract);
router.get("/warranty/:id",cContract.getWarrantiesForContract);

module.exports = router;