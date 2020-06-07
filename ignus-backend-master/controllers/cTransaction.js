const sTransaction = require("../services/sTransaction"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");
const { getFirstPropertyOfObject } = require("../global/helpers")

const { ALL_STATUS_TRANSACTION } = require("../config/properties/constants")

async function getTransactionsAll(req,res) {
	try{
		let status = ALL_STATUS_TRANSACTION
		if(req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
		let transactions = await sTransaction.getTransactionsAll(status)
		//res.status(200).json(transactions);
		makeResponseOk(res, {transactions}, "transaction/listTransaction")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTransactionById(req,res) {
	try{
		const transactionId = req.params.transactionId;
		let transaction = await sTransaction.getTransactionById(transactionId)
		makeResponseOk(res, {transaction}, "transaction/getTransaction")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function approveRequirementByTransactionId(req,res) {
	try{
		const transactionId = req.params.transactionId;
		const requirementId = req.fields.requirementId
		await sTransaction.approveRequirementByTransactionId(transactionId, requirementId)
		makeResponseOkMessage(res,'I047')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function rejectRequirementByTransactionId(req,res) {
	try{
		const transactionId = req.params.transactionId;
		await sTransaction.rejectRequirementByTransactionId(transactionId, req.fields)
		makeResponseOkMessage(res,'I049')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function uploadRequirementByTransactionId(req,res) {
	try{
		const transactionId = req.params.transactionId;
		const requirementId = req.fields.requirementId
		const file = getFirstPropertyOfObject(req.files);
		await sTransaction.uploadRequirementByTransactionId(transactionId, requirementId, file)
		makeResponseOkMessage(res,'I051')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function approveActivityByTransactionId(req,res) {
	try{
		const transactionId = req.params.transactionId;
		const activityId = req.fields.activityId
		await sTransaction.approveActivityByTransactionId(transactionId, activityId)
		makeResponseOkMessage(res,'I053')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function rejectActivityByTransactionId(req,res) {
	try{
		const transactionId = req.params.transactionId;
		await sTransaction.rejectActivityByTransactionId(transactionId, req.fields)
		makeResponseOkMessage(res,'I055')
	}catch(err){
		makeResponseException(res,err)
	}
}


async function getTransactionsAllByUserId(req,res) {
	try{
		let status = ALL_STATUS_TRANSACTION
		if(req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
		let userId = req.query.userId;
		let offeringProperty = req.query.offeringProperty;
		let transactions = await sTransaction.getTransactionsAllByUserId(status, userId, offeringProperty)
		//res.status(200).json(transactions);
		makeResponseOk(res, {transactions}, "transaction/listTransaction")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getServicesTransactionsEmployee(req, res) {
	try {
		let id = req.params.userId;
		let services = await sTransaction.getAllServicesForTransactionsEmployee(id);
		// res.status(200).json(services);
		makeResponseOk(res, {arraydata: services}, "global/arraydata");
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function reserveTransaction(req,res) {
	try{
		const transactionId = req.params.transactionId;
		await sTransaction.reserveTransaction(transactionId)
		makeResponseOkMessage(res,'I081')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function removeReservationTransaction(req,res) {
	try{
		const transactionId = req.params.transactionId;
		await sTransaction.removeReservationTransaction(transactionId)
		makeResponseOkMessage(res,'I083')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getCountTransactionsByUserId(req,res) {
	try {
		let userId = req.params.userId;
		let count = await sTransaction.getCountTransactionsByUserId(userId);
		makeResponseOk(res, {data: count}, "global/count");
	} catch(err){
		makeResponseException(res,err);
	}
}



module.exports = {
	getTransactionsAll,
	getTransactionById,
	approveRequirementByTransactionId,
	rejectRequirementByTransactionId,
	uploadRequirementByTransactionId,
	approveActivityByTransactionId,
	rejectActivityByTransactionId,
	getTransactionsAllByUserId,
	reserveTransaction,
	removeReservationTransaction,
	getCountTransactionsByUserId,
	getServicesTransactionsEmployee
}