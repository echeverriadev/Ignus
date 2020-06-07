const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeAppointment(id) {
  const TypeAppointment = await models.TypeAppointment.findOne({
    where: {id, status: 'A'}
  });
  if(!TypeAppointment) {
    throwException("E030");
  }
  return await TypeAppointment;
}

async function getAllTypeAppointment() {
  return await models.TypeAppointment.findAll({where: { status: 'A' }});
}

async function createTypeAppointment(data) {
  return await models.TypeAppointment.create(data);
}

async function updateTypeAppointment(id, data) {
  const TypeAppointment = await models.TypeAppointment.findByPk(id);
  if(!TypeAppointment) {
    throwException("E030");
  }
  return await TypeAppointment.update(data);
}

async function destroyTypeAppointment(id) {
  const TypeAppointment = await getTypeAppointment(id);
  return await TypeAppointment.update({status: 'E'});
}

module.exports = {
  getTypeAppointment,
  getAllTypeAppointment,
  createTypeAppointment,
  updateTypeAppointment,
  destroyTypeAppointment
}