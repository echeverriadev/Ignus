const sTypeContact = require("../services/sTypeContact"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getTypeContactsAll(req,res) {
	try{
		let typeContacts = await sTypeContact.getAllTypeContact();
		makeResponseOk(res, {typeContacts}, "typeContact/listTypeContact")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTypeContact(req,res) {
	try{
		let id = req.params.id;
		let typeContact = await sTypeContact.getTypeContact(id)
		makeResponseOk(res, {typeContact}, "typeContact/getTypeContact")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeContact(req,res) {
	try{
		let data = req.fields;
		await sTypeContact.createTypeContact(data)
		makeResponseOkMessage(res,'I048')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeContact(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sTypeContact.updateTypeContact(id, data)
		makeResponseOkMessage(res,'I050');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function deleteTypeContact(req,res) {
	try{
		let id = req.params.id;
		await sTypeContact.destroyTypeContact(id);
		makeResponseOkMessage(res,'I052');
	}catch(err){
		makeResponseException(res,err);
	}
}


module.exports = {
	getTypeContactsAll,
	getTypeContact,
	addTypeContact,
	updateTypeContact,
	deleteTypeContact
}