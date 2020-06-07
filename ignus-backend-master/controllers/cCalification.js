const sCalification = require("../services/sCalification"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getCalificationsAll(req,res) {
	try{
		let califications = await sCalification.getCalificationAll();
		makeResponseOk(res, {califications}, "calification/listCalification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getCalification(req,res) {
	try{
		let id = req.params.id;
		let calification = await sCalification.getCalification(id)
		makeResponseOk(res, {calification}, "calification/getCalification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addCalification(req, res) {
  try {
    let data = req.fields;
    await sCalification.addCalification(data);
    makeResponseOkMessage(res, 'I070');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function updateCalification(req, res) {
  try {
    let id = req.params.id;
    let data = req.fields;
    await sCalification.updateCalification(id, data);
    makeResponseOkMessage(res, 'I072');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function deleteCalification(req, res) {
  try {
    let id = req.params.id;
    await sCalification.deleteCalification(id);
    makeResponseOkMessage(res, 'I074');
  } catch(err) {
    makeResponseException(res,err);
  }
}

module.exports = {
	getCalificationsAll,
  getCalification,
  addCalification,
  updateCalification,
  deleteCalification
}