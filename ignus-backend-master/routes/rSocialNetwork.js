var express = require("express"),
	cSocialNetwork = require("../controllers/cSocialNetwork");

var router = express.Router();

router.get("/",cSocialNetwork.getSocialNetworks);
router.post("/",cSocialNetwork.addSocialNetwork);
router.put("/:id",cSocialNetwork.updateSocialNetwork);
router.delete("/:id",cSocialNetwork.deleteSocialNetwork);

module.exports = router;
