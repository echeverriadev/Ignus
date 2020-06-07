const sIncidence = require("../services/sIncidence"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");


async function getIncidence(req, res) {
  try {
    const id = req.params.id;
    const incidence = await sIncidence.getIncidence(id);
    makeResponseOk(res, {incidence}, "incidence/getIncidence");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllsIncidence(req, res) {
  try {
    const userId = req.query.userId
    const incidents = await sIncidence.getAllIncidence(userId);
    //res.status(200).json(incidents)
    makeResponseOk(res, {incidents}, "incidence/listIncidence");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addIncidence(req, res) {
  try {
    await sIncidence.createIncidence(req.fields);
    makeResponseOkMessage(res, "I030");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function respondIncidence(req, res) {
	try {
		let id = req.params.id;
		let data = req.fields;
    await sIncidence.respondIncidence(id,data);
		makeResponseOkMessage(res, 'I073');
	} catch(err) {
		makeResponseException(res,err);
	}
}

async function updateIncidence(req, res) {
  const { fields } = req;
  try {
    await sIncidence.updateIncidence(req.params.id, fields);
    makeResponseOkMessage(res, 'I032');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyIncidence(req, res) {
  try {
    await sIncidence.destroyIncidence(req.params.id);
    makeResponseOkMessage(res, 'I034');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getCountIncidencesByUserId(req,res) {
	try {
		let userId = req.params.userId;
		let count = await sIncidence.getCountIncidencesByUserId(userId);
		makeResponseOk(res, {data: count}, "global/count");
	} catch(err){
		makeResponseException(res,err);
	}
}

module.exports = {
  getIncidence,
  getAllsIncidence,
  addIncidence,
  updateIncidence,
  destroyIncidence,
  respondIncidence,
  getCountIncidencesByUserId
}