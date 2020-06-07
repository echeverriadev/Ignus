const sTypeAppointment = require("../services/sTypeAppointment"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getAllTypesAppointment(req, res) {
  try {
    const typeAppointment = await sTypeAppointment.getAllTypeAppointment();
    makeResponseOk(res, {data: typeAppointment}, "global/master")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getTypeAppointment(req, res) {
  try {
    let id = req.params.id;
    const typeAppointment = await sTypeAppointment.getTypeAppointment(id);
    makeResponseOk(res, {typeAppointment}, "typeAppointment/getTypeAppointment");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addTypeAppointment(req, res) {
  try {
    let body = req.fields;
    await sTypeAppointment.createTypeAppointment(body);
    makeResponseOkMessage(res, "I114");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateTypeAppointment(req, res) {
  try {
    let id = req.params.id;
    let body = req.fields;
    await sTypeAppointment.updateTypeAppointment(id, body);
    makeResponseOkMessage(res, "I116");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteTypeAppointment(req, res) {
  try {
    let id = req.params.id;
    await sTypeAppointment.destroyTypeAppointment(id);
    makeResponseOkMessage(res, "I118");
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getAllTypesAppointment,
  getTypeAppointment,
  addTypeAppointment,
  updateTypeAppointment,
  deleteTypeAppointment
}