const sRequirement = require("../services/sRequirement"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getRequirements(req,res) {
	try{
		let requirements = await sRequirement.getRequirementsAll()
		makeResponseOk(res, {data:requirements}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addRequirement(req,res) {
	try{
		let body = req.fields;
		await sRequirement.addRequirement(body)
		makeResponseOkMessage(res,'I003')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateRequirement(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sRequirement.updateRequirement(id,body)
		makeResponseOkMessage(res,'I005')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteRequirement(req,res) {
	try{
		let id = req.params.id
		await sRequirement.deleteRequirement(id)
		makeResponseOkMessage(res,'I007')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getRequirements,
	addRequirement,
	updateRequirement,
	deleteRequirement
}