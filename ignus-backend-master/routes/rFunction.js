var express = require("express"),
	cFunction = require("../controllers/cFunction");

var router = express.Router();

router.get("/",cFunction.getAllFunctions);
router.get("/linkable", cFunction.getAllLinkableFunctions);
router.post("/",cFunction.addFunction);
router.get("/:id",cFunction.getFunction);
router.put("/:id",cFunction.updateFunction);
router.delete("/:id",cFunction.deleteFunction);
router.get("/role/:id",cFunction.getRolesForFunction);

module.exports = router;