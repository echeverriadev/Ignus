const sTypeRequest = require("../services/sTypeRequest"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getTypeRequests(req,res) {
	try{
		let typeRequests = await sTypeRequest.getTypeRequestsAll()
		makeResponseOk(res, {data:typeRequests}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeRequest(req,res) {
	try{
		let body = req.fields;
		await sTypeRequest.addTypeRequest(body)
		makeResponseOkMessage(res,'I033')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeRequest(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sTypeRequest.updateTypeRequest(id,body)
		makeResponseOkMessage(res,'I035')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteTypeRequest(req,res) {
	try{
		let id = req.params.id
		await sTypeRequest.deleteTypeRequest(id)
		makeResponseOkMessage(res,'I037')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getTypeRequests,
	addTypeRequest,
	updateTypeRequest,
	deleteTypeRequest
}