const models = require("../models");
const {throwException} = require("../global/helpers");
const { saveFile } = require("../global/fileSystem")


async function getAgency(){
    let agency = await models.Agency.findOne({
        where: {id : 1, status : 'A'},
        include: [{
          model: models.Image,
          where: {status : 'A', TypeImageId : 1 } //Only logos
        },{
          model: models.SocialNetwork,
        }],
    })
    if(!agency)
        throwException('E011')
    return agency;
}

async function getSocialNetworkForAgency(){
    let agency = await getAgency()
    let socialNetworks = await agency.getSocialNetworks({where: {status:'A'}});
    if(!socialNetworks || !socialNetworks.length)
        throwException('E017')
    return socialNetworks;
}

async function getLogoForAgency(){
    let agency = await getAgency()
    let logo = await agency.getImages({where: {status : 'A', TypeImageId : 1 }});
    if(!logo || !logo.length)
        throwException('E017')
    return logo[0];
}


async function createAgency(agency){
    await models.Agency.create(agency)
}

async function updateAgency(agencyNew, logo = null){
    await models.sequelize.transaction(async transaction=>{
        let agencyOld = await getAgency();
        let publicUrl
        if(logo)
             publicUrl = saveFile(logo.path,"logo")
             
        await models.Image.update(
            { url : publicUrl },
            { where : {status : 'A', TypeImageId : 1 }, transaction }
        )
        await agencyOld.update(agencyNew,{transaction});
    });
    
}


module.exports = {
  getAgency,
  createAgency,
  updateAgency,
  getSocialNetworkForAgency,
  getLogoForAgency
}