const models = require("../models");
const {throwException} = require("../global/helpers");


async function getSubjectsAll() {
  return await models.Subject.findAll({where: {status:'A'}})
}

async function getSubject(id) {
  let subject = await models.Subject.findOne({where: {id, status : 'A'}})
  if(!subject)
    throwException('E051')
  return subject;
}

async function addSubject(data) {
  await models.Subject.create(data)
}

async function updateSubject(id,data) {
  let subjectOld = await getSubject(id)
  await subjectOld.update(data);
}

async function deleteSubject(id) {
  let subjectOld = await getSubject(id)
  await subjectOld.update({status:'E'});
}

module.exports = {
  getSubjectsAll,
  addSubject,
  updateSubject,
  getSubject,
  deleteSubject
}