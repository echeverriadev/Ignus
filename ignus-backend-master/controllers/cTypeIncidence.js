const sTypeIncidence = require("../services/sTypeIncidence"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getAllTypesIncidence(req, res) {
  try {
    const typeIncidents = await sTypeIncidence.getAllTypeIncidence();
    makeResponseOk(res, {data: typeIncidents}, "global/master")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getTypeIncidence(req, res) {
  try {
    let id = req.params.id;
    const typeIncidence = await sTypeIncidence.getTypeIncidence(id);
    makeResponseOk(res, {typeIncidence}, "typeIncidence/getTypeIncidence");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addTypeIncidence(req, res) {
  try {
    let body = req.fields;
    await sTypeIncidence.createTypeIncidence(body);
    makeResponseOkMessage(res, "I102");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateTypeIncidence(req, res) {
  try {
    let id = req.params.id;
    let body = req.fields;
    await sTypeIncidence.updateTypeIncidence(id, body);
    makeResponseOkMessage(res, "I104");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteTypeIncidence(req, res) {
  try {
    let id = req.params.id;
    await sTypeIncidence.destroyTypeIncidence(id);
    makeResponseOkMessage(res, "I106");
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getAllTypesIncidence,
  getTypeIncidence,
  addTypeIncidence,
  updateTypeIncidence,
  deleteTypeIncidence
}