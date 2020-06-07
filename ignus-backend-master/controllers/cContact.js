const sContact = require("../services/sContact"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
	
async function getContactsAll(req,res) {
	try{
		let query = req.query;
		let contacts = await sContact.getContactAll(query);
		makeResponseOk(res, {contacts}, "contact/listContact")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getContact(req,res) {
	try{
		let id = req.params.id;
		let contact = await sContact.getContact(id)
		//res.status(200).json(contact)
		makeResponseOk(res, {contact}, "contact/getContact")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addContact(req, res) {
  try {
    let data = req.fields;
		await sContact.addContact(data);
		makeResponseOkMessage(res,'I054');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function respondContact(req, res) {
	try {
		let id = req.params.id;
		let { message } = req.fields;
		await sContact.respondContact(id, message);
		makeResponseOkMessage(res, 'I062');
	} catch(err) {
		makeResponseException(res,err);
	}
}

async function deleteContact(req, res) {
  try {
		let contactId = req.params.contactId;
		await sContact.deleteContact(contactId);
		makeResponseOkMessage(res,'I065');
  } catch(err) {
    makeResponseException(res,err);
  }
}

module.exports = {
	getContactsAll,
	getContact,
	addContact,
	respondContact,
	deleteContact
}