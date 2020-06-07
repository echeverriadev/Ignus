var express = require("express"),
	cSubject = require("../controllers/cSubject");

var router = express.Router();

router.get("/",cSubject.getSubjects);
router.post("/",cSubject.addSubject);
router.put("/:id",cSubject.updateSubject);
router.delete("/:id",cSubject.deleteSubject);

module.exports = router;
