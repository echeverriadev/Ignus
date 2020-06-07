const sTypeProperty = require("../services/sTypeProperty"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getTypePropertysAll(req,res) {
	try{
		let typePropertys = await sTypeProperty.getTypePropertyAll();
		makeResponseOk(res, {typePropertys}, "typeProperty/listTypeProperty")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTypeProperty(req,res) {
	try{
		let id = req.params.id;
		let typeProperty = await sTypeProperty.getTypeProperty(id)
		makeResponseOk(res, {typeProperty}, "typeProperty/getTypeProperty")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getSpecificationsForTypeProperty(req,res) {
	try{
		let id = req.params.id;
		let typeSpecifications = await sTypeProperty.getSpecificationsForTypeProperty(id);
		makeResponseOk(res, {typeSpecifications}, "typeSpecification/listTypeSpecification");
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeProperty(req,res) {
	try{
		let data = req.fields;
		await sTypeProperty.addTypeProperty(data)
		makeResponseOkMessage(res,'I056')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeProperty(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sTypeProperty.updateTypeProperty(id, data)
		makeResponseOkMessage(res,'I058');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function deleteTypeProperty(req,res) {
	try{
		let id = req.params.id;
		await sTypeProperty.deleteTypeProperty(id)
		makeResponseOkMessage(res,'I060');
	}catch(err){
		makeResponseException(res,err);
	}
}


module.exports = {
	getTypePropertysAll,
	getTypeProperty,
	getSpecificationsForTypeProperty,
	addTypeProperty,
	updateTypeProperty,
	deleteTypeProperty
}