const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeIncidence(id) {
  const typeIncidence = await models.TypeIncidence.findOne({
    where: {id, status: 'A'}
  });
  if(!typeIncidence) {
    throwException("E003");
  }
  return await typeIncidence;
}

async function getAllTypeIncidence() {
  return await models.TypeIncidence.findAll({where: { status: 'A' }});
}

async function createTypeIncidence(data) {
  return await models.TypeIncidence.create(data);
}

async function updateTypeIncidence(id, data) {
  const typeIncidence = await models.TypeIncidence.findByPk(id);
  if(!typeIncidence) {
    throwException("E003");
  }
  return await typeIncidence.update(data);
}

async function destroyTypeIncidence(id) {
  const typeIncidence = await getTypeIncidence(id);
  return await typeIncidence.update({status: 'E'});
}

module.exports = {
  getTypeIncidence,
  getAllTypeIncidence,
  createTypeIncidence,
  updateTypeIncidence,
  destroyTypeIncidence
}