const sTypeCalification = require("../services/sTypeCalification"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getTypeCalificationsAll(req,res) {
	try{
		let typeCalifications = await sTypeCalification.getTypeCalificationAll();
		makeResponseOk(res, {typeCalifications}, "typeCalification/listTypeCalification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTypeCalification(req,res) {
	try{
		let id = req.params.id;
		let typeCalification = await sTypeCalification.getTypeCalification(id)
		makeResponseOk(res, {typeCalification}, "typeCalification/getTypeCalification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeCalification(req,res) {
	try{
		let data = req.fields;
		await sTypeCalification.addTypeCalification(data)
		makeResponseOkMessage(res,'I064')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeCalification(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sTypeCalification.updateTypeCalification(id, data)
		makeResponseOkMessage(res,'I066');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function deleteTypeCalification(req,res) {
	try{
		let id = req.params.id;
		await sTypeCalification.deleteTypeCalification(id)
		makeResponseOkMessage(res,'I068');
	}catch(err){
		makeResponseException(res,err);
	}
}


module.exports = {
	getTypeCalificationsAll,
	getTypeCalification,
	addTypeCalification,
	updateTypeCalification,
	deleteTypeCalification
}