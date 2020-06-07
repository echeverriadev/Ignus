const models = require("../models");
const {throwException} = require("../global/helpers");


async function getTypeRequestsAll() {
  return await models.TypeRequest.findAll({where: {status:'A'}})
}

async function getTypeRequest(id) {
  let typeRequest = await models.TypeRequest.findOne({where: {id, status : 'A'}})
  if(!typeRequest)
    throwException('E019')
  return typeRequest;
}

async function addTypeRequest(data) {
  await models.TypeRequest.create(data)
}

async function updateTypeRequest(id,data) {
  let typeRequestOld = await getTypeRequest(id)
  await typeRequestOld.update(data);
}

async function deleteTypeRequest(id) {
  let typeRequestOld = await getTypeRequest(id)
  await typeRequestOld.update({status:'E'});
}

module.exports = {
  getTypeRequestsAll,
  addTypeRequest,
  updateTypeRequest,
  getTypeRequest,
  deleteTypeRequest
}