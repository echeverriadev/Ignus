const sNotification = require("../services/sNotification"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");


async function checkForNewNotifications(req,res) {
	try {
		let userId = req.params.userId;
		let cantNewNotifications = await sNotification.checkForNewNotifications(userId);
		makeResponseOk(res, {cantNewNotifications}, "notification/checkNewNotifications");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function getAllNotifications(req,res) {
	try {
		let userId = req.params.userId;
		let notifications = await sNotification.getAllNotifications(userId);
		makeResponseOk(res, {data: notifications}, "notification/listNotification");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function addNotification(req,res) {
	try {
		const { text, TypeNotificationId, UserId } = req.fields;
		await sNotification.addNotification(UserId, text, TypeNotificationId);
		makeResponseOkMessage(res, 'I057');
	} catch(err){
		makeResponseException(res,err);
	}
}

async function getUnreadNotificacions(req,res) {
	try {
		let userId = req.params.userId;
		let notifications = await sNotification.getUnreadNotificacions(userId);
		makeResponseOk(res, {data: notifications}, "notification/listNotification");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function getCountNotificationsByUserId(req,res) {
	try {
		let userId = req.params.userId;
		let count = await sNotification.getCountNotificationsByUserId(userId);
		makeResponseOk(res, {data: count}, "global/count");
	} catch(err){
		makeResponseException(res,err);
	}
}




module.exports = {
    checkForNewNotifications,
    getAllNotifications,
    addNotification,
    getUnreadNotificacions,
    getCountNotificationsByUserId
}