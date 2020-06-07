const sColor = require("../services/sColor"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getColor(req, res) {
  try {
    const id = req.params.id;
    const color = await sColor.getColor(id);
    makeResponseOk(res, {color}, "color/getColor");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllsColor(req, res) {
  try {
    const colors = await sColor.getAllColor();
    makeResponseOk(res, {colors}, "color/listColor");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addColor(req, res) {
  try {
    await sColor.createColor(req.fields);
    makeResponseOkMessage(res, "I094");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateColor(req, res) {
  const { fields } = req;
  try {
    await sColor.updateColor(req.params.id, fields);
    makeResponseOkMessage(res, 'I096');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyColor(req, res) {
  try {
    await sColor.destroyColor(req.params.id);
    makeResponseOkMessage(res, 'I098');
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getColor,
  getAllsColor,
  addColor,
  updateColor,
  destroyColor
}