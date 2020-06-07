const sWarranty = require("../services/sWarranty"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getAllWarrantys(req, res) {
  try {
    const warrantys = await sWarranty.getAllWarrantys();
    makeResponseOk(res, {warrantys}, "warranty/listWarranty");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getWarranty(req,res) {
	try {
		let id = req.params.id;
		let warranty = await sWarranty.getWarranty(id);
		makeResponseOk(res, {warranty}, "warranty/getWarranty");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function addWarranty(req,res) {
	try {
		let data = req.fields;
		await sWarranty.createWarranty(data);
		makeResponseOkMessage(res,'I018');
	} catch(err) {
		makeResponseException(res,err)
	}
}

async function updateWarranty(req,res) {
	try {
		let data = req.fields;
		let id = req.params.id;
		await sWarranty.updateWarranty(id, data);
		makeResponseOkMessage(res,'I020')
	} catch(err){
		makeResponseException(res,err)
	}
}

async function deleteWarranty(req,res) {
	try{
		let id = req.params.id;
		await sWarranty.destroyWarranty(id);
		makeResponseOkMessage(res,'I022')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
  getAllWarrantys,
  getWarranty,
  addWarranty,
  updateWarranty,
  deleteWarranty
}