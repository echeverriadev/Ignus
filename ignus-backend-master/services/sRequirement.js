const models = require("../models");
const {throwException} = require("../global/helpers");


async function getRequirementsAll() {
  return await models.Requirement.findAll({where: {status:'A'}})
}

async function getRequirement(id) {
  let requirement = await models.Requirement.findOne({where: {id, status : 'A'}})
  if(!requirement)
    throwException('E009')
  return requirement;
}

async function addRequirement(data) {
  await models.Requirement.create(data)
}

async function updateRequirement(id,data) {
  let requirementOld = await getRequirement(id)
  await requirementOld.update(data);
}

async function deleteRequirement(id) {
  let requirementOld = await getRequirement(id)
  await requirementOld.update({status:'E'});
}

module.exports = {
  getRequirementsAll,
  addRequirement,
  updateRequirement,
  getRequirement,
  deleteRequirement
}