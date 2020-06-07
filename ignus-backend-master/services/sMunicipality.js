const models = require("../models");
const {throwException} = require("../global/helpers");


async function getParishForMunicipality(id) {
  let municipality = await models.Municipality.findByPk(id,{where: {status:'A'}})
  let parishes = await municipality.getParishes({where: {status:'A'}});
  return parishes;
}


module.exports = {
  getParishForMunicipality
}