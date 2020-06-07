const models = require("../models");
const {throwException} = require("../global/helpers");


async function getSocialNetworksAll() {
  return await models.SocialNetwork.findAll({where: {status:'A'}})
}

async function getSocialNetwork(id) {
  let socialNetwork = await models.SocialNetwork.findOne({where: {id, status : 'A'}})
  if(!socialNetwork)
    throwException('E009')
  return socialNetwork;
}

async function addSocialNetwork(data) {
  await models.SocialNetwork.create(data)
}

async function updateSocialNetwork(id,data) {
  await models.sequelize.transaction(async transaction=>{
    
    let socialNetworkOld = await getSocialNetwork(id)
    let agency = await socialNetworkOld.getAgency({transaction});
    if(!agency){ //If it has no agency associated, e.g. google+
      await socialNetworkOld.setAgency(1,{transaction})
    }
    await socialNetworkOld.update(data,{transaction})
    
  });
}

async function deleteSocialNetwork(id) {
  let socialNetworkOld = await getSocialNetwork(id)
  await socialNetworkOld.update({status:'E'});
}

module.exports = {
  getSocialNetworksAll,
  addSocialNetwork,
  updateSocialNetwork,
  getSocialNetwork,
  deleteSocialNetwork
}