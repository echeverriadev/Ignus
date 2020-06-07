const models = require("../models");
const {throwException} = require("../global/helpers");


async function getStatesAll() {
  return await models.State.findAll({where: {status:'A'}})
}

async function getCityForState(id) {
  let state = await models.State.findByPk(id,{where: {status:'A'}})
  let cities = await state.getCities({where: {status:'A'}});
  return cities;
}

async function getMunicipalityForState(id) {
  let state = await models.State.findByPk(id,{where: {status:'A'}})
  let municipalities = await state.getMunicipalities({where: {status:'A'}});
  return municipalities;
}


module.exports = {
  getStatesAll,
  getCityForState,
  getMunicipalityForState
}