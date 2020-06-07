const models = require("../models");
const {throwException} = require("../global/helpers");

async function getCalificationAll() {
  let Califications = await models.Calification.findAll({
    where: { status: 'A' },
    include: [
      { model: models.TypeCalification },
      { model: models.QualificationCriteria }
    ]
  })
  if(!Califications || !Califications.length)
    throwException('E028')
  return Califications
}

async function getCalification(id) {
  let Calification = await models.Calification.findOne({
    where: { status: 'A', id },
    include: [
      { model: models.TypeCalification },
      { model: models.QualificationCriteria }
    ]
  })
  if(!Calification)
    throwException('E028')
    
  return Calification
}

async function addCalification(data) {
  await models.sequelize.transaction(async transaction=>{
    for(let i=0; i < data.answers.length; i++) {
      let saveData = {
        TransactionId: data.TransactionId,
        TypeCalificationId: data.answers[i].TypeCalificationId,
        QualificationCriteriumId: data.answers[i].QualificationCriteriumId
      };
      await models.Calification.create(saveData);
    }
  });
  
}

async function updateCalification(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let Calification = await getCalification(id);
    await Calification.update(data,{transaction})
  });
}

async function deleteCalification(id) {
  let Calification = await getCalification(id);
  Calification.update({status:'E'})
}

module.exports = {
  getCalificationAll,
  getCalification,
  addCalification,
  updateCalification,
  deleteCalification
}