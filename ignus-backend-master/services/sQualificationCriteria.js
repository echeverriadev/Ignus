const models = require("../models");
const {throwException} = require("../global/helpers");


async function getQualificationCriteriasAll() {
  return await models.QualificationCriteria.findAll({where: {status:'A'}})
}

async function getQualificationCriteria(id) {
  let qualificationCriteria = await models.QualificationCriteria.findOne({where: {id, status : 'A'}})
  if(!qualificationCriteria)
    throwException('E055')
  return qualificationCriteria;
}

async function addQualificationCriteria(data) {
  await models.QualificationCriteria.create(data)
}

async function updateQualificationCriteria(id,data) {
  let qualificationCriteriaOld = await getQualificationCriteria(id)
  await qualificationCriteriaOld.update(data);
}

async function deleteQualificationCriteria(id) {
  let qualificationCriteriaOld = await getQualificationCriteria(id)
  await qualificationCriteriaOld.update({status:'E'});
}

module.exports = {
  getQualificationCriteriasAll,
  addQualificationCriteria,
  updateQualificationCriteria,
  getQualificationCriteria,
  deleteQualificationCriteria
}