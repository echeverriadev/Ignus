var express = require("express"),
	cIncidence = require("../controllers/cIncidence");

var router = express.Router();

router.get("/",cIncidence.getAllsIncidence);
router.get("/count/:userId",cIncidence.getCountIncidencesByUserId);
router.post("/",cIncidence.addIncidence);
router.get("/:id",cIncidence.getIncidence);
router.put("/:id",cIncidence.updateIncidence);
router.delete("/:id",cIncidence.destroyIncidence);
router.put("/respond/:id",cIncidence.respondIncidence);



module.exports = router;