const models = require("../models");
const {throwException} = require("../global/helpers");
const { saveFile } = require("../global/fileSystem")


async function getTypeServiceAll(offeringProperty) {
  let where = { status: 'A' }
  if(offeringProperty)
    where.offeringProperty = offeringProperty
  let services = await models.TypeService.findAll({
    where,
    include: [{
      model: models.Requirement,
    },{
      model: models.Activity,
    }],
    order: [
      ['id','asc'],
      [models.Activity,'id','asc'],
      [models.Requirement,'id','asc'],
    ]
  })
  if(!services || !services.length)
    throwException('E005')
  return services
}

async function getRequirementForTypeService(id) {
  let service = await models.TypeService.findByPk(id)
  if(!service)
    throwException('E005')
  let requirements = await service.getRequirements()
  if(!requirements || !requirements.length)
    throwException('E007')
    
  return requirements
}

async function getActivitiesForTypeService(id) {
  let service = await models.TypeService.findByPk(id)
  if(!service)
    throwException('E005')
  let activities = await service.getActivities()
  if(!activities || !activities.length)
    throwException('E007')
    
  return activities
}

async function getTypeService(id) {
  let service = await models.TypeService.findOne({
     where: { status: 'A', id },
    include: [{
      model: models.Requirement,
    },{
      model: models.Activity,
    }],
    order: [
      ['id','asc'],
      [models.Activity,'id','asc'],
      [models.Requirement,'id','asc'],
    ]
  })
  if(!service)
    throwException('E005')
    
  return service
}

async function addTypeService(data, image) {
  await models.sequelize.transaction(async transaction=>{
    const urlImage = saveFile(image.path,"typeService")
    data.urlImage = urlImage 
    let typeService = await models.TypeService.create(data,{transaction});
    await typeService.setRequirements(data.requirements,{transaction})
    await typeService.setActivities(data.activities,{transaction})
  });
}

async function updateTypeService(id,data, image=null) {
  await models.sequelize.transaction(async transaction=>{
    let typeService = await getTypeService(id);
    await typeService.setRequirements(data.requirements,{transaction})
    await typeService.setActivities(data.activities,{transaction})
    if(image){
      data.urlImage = saveFile(image.path,"typeService")
    }
    await typeService.update(data,{transaction})
  });
}

async function deleteTypeService(id) {
  let typeService = await getTypeService(id);
  typeService.update({status:'E'})
}




module.exports = {
  getTypeServiceAll,
  getRequirementForTypeService,
  getActivitiesForTypeService,
  getTypeService,
  addTypeService,
  updateTypeService,
  deleteTypeService
}