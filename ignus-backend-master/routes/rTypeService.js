var express = require("express"),
	cTypeService = require("../controllers/cTypeService");

var router = express.Router();

router.get("/",cTypeService.getTypeServicesAll);
router.post("/",cTypeService.addTypeService);
router.get("/:id",cTypeService.getTypeService);
router.put("/:id",cTypeService.updateTypeService);
router.delete("/:id",cTypeService.deleteTypeService);
router.get("/requirement/:id",cTypeService.getRequirementForTypeService);
router.get("/activity/:id",cTypeService.getActivitiesForTypeService);

module.exports = router;


