const sTypeSpecification = require("../services/sTypeSpecification"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getTypeSpecificationsAll(req,res) {
	try{
		let typeSpecifications = await sTypeSpecification.getTypeSpecificationAll();
		makeResponseOk(res, {typeSpecifications}, "typeSpecification/listTypeSpecification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTypeSpecification(req,res) {
	try{
		let id = req.params.id;
		let typeSpecification = await sTypeSpecification.getTypeSpecification(id)
		makeResponseOk(res, {typeSpecification}, "typeSpecification/getTypeSpecification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeSpecification(req,res) {
	try{
		let data = req.fields;
		await sTypeSpecification.addTypeSpecification(data)
		makeResponseOkMessage(res,'I036')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeSpecification(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sTypeSpecification.updateTypeSpecification(id, data)
		makeResponseOkMessage(res,'I038');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function deleteTypeSpecification(req,res) {
	try{
		let id = req.params.id;
		await sTypeSpecification.deleteTypeSpecification(id)
		makeResponseOkMessage(res,'I040');
	}catch(err){
		makeResponseException(res,err);
	}
}


module.exports = {
	getTypeSpecificationsAll,
	getTypeSpecification,
	addTypeSpecification,
	updateTypeSpecification,
	deleteTypeSpecification
}