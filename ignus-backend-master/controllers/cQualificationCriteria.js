const sQualificationCriteria = require("../services/sQualificationCriteria"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getQualificationCriterias(req,res) {
	try{
		let qualificationCriterias = await sQualificationCriteria.getQualificationCriteriasAll()
		makeResponseOk(res, {data:qualificationCriterias}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addQualificationCriteria(req,res) {
	try{
		let body = req.fields;
		await sQualificationCriteria.addQualificationCriteria(body)
		makeResponseOkMessage(res,'I075')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateQualificationCriteria(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sQualificationCriteria.updateQualificationCriteria(id,body)
		makeResponseOkMessage(res,'I077')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteQualificationCriteria(req,res) {
	try{
		let id = req.params.id
		await sQualificationCriteria.deleteQualificationCriteria(id)
		makeResponseOkMessage(res,'I079')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getQualificationCriterias,
	addQualificationCriteria,
	updateQualificationCriteria,
	deleteQualificationCriteria
}