const sRequest = require("../services/sRequest"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");

//deprecated
async function getRequestsPendingAll(req,res) {
	try{
		let requests = await sRequest.getRequestsPendingAll()
		//res.status(200).json(requests);
		makeResponseOk(res, {requests}, "request/listRequest")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getRequestsAll(req,res) {
	try{
		let status = ['R','A','S','F','D'];
		let userId = req.query.userId;

		if(req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
		let requests = await sRequest.getRequestsAll(status, userId);
		//res.status(200).json(requests);
		makeResponseOk(res, {requests}, "request/listRequest")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getRequestById(req,res) {
	try{
		const requestId = req.params.requestId
		let request = await sRequest.getRequestById(requestId);
		makeResponseOk(res, {request}, "request/getRequest")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addRequestPending(req,res) {
	try{
		let body = req.fields;
		await sRequest.addRequestPending(body)
		makeResponseOkMessage(res,'I039')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function approveRequest(req,res) {
	try{
		let id = req.params.id
		await sRequest.approveRequest(id)
		makeResponseOkMessage(res,'I045')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateRequest(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sRequest.updateRequest(id,body)
		makeResponseOkMessage(res,'I005')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteRequest(req,res) {
	try{
		let id = req.params.id
		await sRequest.deleteRequest(id)
		makeResponseOkMessage(res,'I007')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getCountRequestsByUserId(req,res) {
	try {
		let userId = req.params.userId;
		let count = await sRequest.getCountRequestsByUserId(userId);
		makeResponseOk(res, {data: count}, "global/count");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function rejectRequest(req,res) {
	try{
		let id = req.params.id
		await sRequest.rejectRequest(id)
		makeResponseOkMessage(res,'I085')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getRequestsPendingAll,
	approveRequest,
	updateRequest,
	deleteRequest,
	addRequestPending,
	getRequestById,
	getRequestsAll,
	getCountRequestsByUserId,
	rejectRequest
}