const models = require("../models"),
  sClient = require("../services/sClient"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
	
const { ALL_STATUS_TRANSACTION } = require("../config/properties/constants")

async function getClient(req, res) {
  try {
    const id = req.params.id;
    const client = await sClient.getClient(id);
    makeResponseOk(res, {client}, "client/getClient");
  } catch(err) {
    makeResponseException(res, err);
  }
}


async function getRequestClientAll(req,res) {
  try {
    const id = req.params.userId
    const requests = await sClient.getRequestClientAll(id);
    makeResponseOk(res, {requests}, "request/listRequest")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getClients(req,res) {
  try {
    const clients = await sClient.getClientAll();
    makeResponseOk(res, {clients}, "client/listClients")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateClient(req, res) {
  const { fields } = req;
  try {
    await sClient.updateClient(req.params.user_id, fields);
    makeResponseOkMessage(res, 'I002');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyClient(req, res) {
  try {
    await sClient.destroyClient(req.params.user_id);
    makeResponseOkMessage(res, 'I004');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllTransactionsClient(req, res) {
  try {
    let status = ALL_STATUS_TRANSACTION
		if(req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
    let userId = req.params.userId;
    const transactions = await sClient.getAllTransactionsClient(userId, status);
    makeResponseOk(res, {transactions}, "transaction/listTransaction")
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addSpecificationsForClient(req, res) {
  try {
    let body = req.fields;
    let userId = req.params.id;
    let client = await sClient.getClientByUserId(userId);
    await sClient.addSpecificationsForClient(client.id, body);
    makeResponseOkMessage(res, 'I100');
  } catch(err) {
    makeResponseException(res, err);
  }
}


async function updatePreferencesByClientId(req, res) {
  try {
    const fields = req.fields;
    const clientId = req.params.clientId
    await sClient.updatePreferencesByClientId(fields, clientId);
    makeResponseOkMessage(res, 'I087');
  } catch(err) {
    makeResponseException(res, err);
  }
}



module.exports = {
  getClient,
  getClients,
  updateClient,
  destroyClient,
  addSpecificationsForClient,
  getRequestClientAll,
  getAllTransactionsClient,
  updatePreferencesByClientId
}