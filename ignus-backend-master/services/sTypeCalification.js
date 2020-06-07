const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeCalificationAll() {
  let Califications = await models.TypeCalification.findAll({
    where: { status: 'A' },
    order: [
      ['id','asc']
    ]
  })
  if(!Califications || !Califications.length)
    throwException('E026')
  return Califications
}

async function getTypeCalification(id) {
  let Calification = await models.TypeCalification.findOne({
    where: { status: 'A', id },
    include: [{
      model: models.Calification 
    }],
    order: [
      ['id','asc']
    ]
  })
  if(!Calification)
    throwException('E026')
    
  return Calification
}

async function addTypeCalification(data) {
  await models.sequelize.transaction(async transaction=>{
    await models.TypeCalification.create(data,{transaction});
  });
}

async function updateTypeCalification(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let typeCalification = await getTypeCalification(id);
    await typeCalification.update(data,{transaction})
  });
}

async function deleteTypeCalification(id) {
  let typeCalification = await getTypeCalification(id);
  typeCalification.update({status:'E'})
}

module.exports = {
  getTypeCalificationAll,
  getTypeCalification,
  addTypeCalification,
  updateTypeCalification,
  deleteTypeCalification
}