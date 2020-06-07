const sSpecification = require("../services/sSpecification"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");

async function getSpecificationsAll(req,res) {
	try{
    let query = req.query;
		let Specifications = await sSpecification.getSpecificationAll(query);
		makeResponseOk(res, {data: Specifications}, "specification/listSpecification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getSpecification(req,res) {
	try{
    let id = req.params.id;
    let query = req.query;
		let Specification = await sSpecification.getSpecification(id, query);
		makeResponseOk(res, {Specification}, "specification/getSpecification")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addSpecification(req, res) {
  try {
    let body = req.fields;
    await sSpecification.addSpecification(body);
    makeResponseOkMessage(res, "I108");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateSpecification(req, res) {
  try {
    let id = req.params.id;
    let body = req.fields;
    await sSpecification.updateSpecification(id, body);
    makeResponseOkMessage(res, "I110");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteSpecification(req, res) {
  try {
    let id = req.params.id;
    await sSpecification.deleteSpecification(id);
    makeResponseOkMessage(res, "I112");
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
	getSpecificationsAll,
	getSpecification,
	addSpecification,
	updateSpecification,
	deleteSpecification
}