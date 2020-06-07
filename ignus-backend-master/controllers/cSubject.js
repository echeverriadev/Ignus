const sSubject = require("../services/sSubject"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getSubjects(req,res) {
	try{
		let subjects = await sSubject.getSubjectsAll()
		makeResponseOk(res, {data:subjects}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addSubject(req,res) {
	try{
		let body = req.fields;
		await sSubject.addSubject(body)
		makeResponseOkMessage(res,'I059')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateSubject(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sSubject.updateSubject(id,body)
		makeResponseOkMessage(res,'I061')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteSubject(req,res) {
	try{
		let id = req.params.id
		await sSubject.deleteSubject(id)
		makeResponseOkMessage(res,'I063')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getSubjects,
	addSubject,
	updateSubject,
	deleteSubject
}