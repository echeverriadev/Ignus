var express = require("express"),
	cNotification = require("../controllers/cNotification");

var router = express.Router();

router.get("/check/:userId",cNotification.checkForNewNotifications);
router.get("/count/:userId",cNotification.getCountNotificationsByUserId);
router.get("/:userId",cNotification.getAllNotifications);
router.get("/unread/:userId",cNotification.getUnreadNotificacions);
router.post("/",cNotification.addNotification);

module.exports = router;

