const models = require("../models");
const {throwException} = require("../global/helpers");
const { Op } = require("../global/helpers");

async function getTypeSpecificationAll() {
  let specifications = await models.TypeSpecification.findAll({
    where: { status: 'A' },
    include: [{
      model: models.Specification 
    }],
    order: [
      ['id','asc']
    ]
  })
  if(!specifications || !specifications.length)
    throwException('E016')
  return specifications
}

async function getTypeSpecification(id) {
  let specification = await models.TypeSpecification.findOne({
    where: { status: 'A', id },
    include: [{
      model: models.Specification 
    }],
    order: [
      ['id','asc']
    ]
  })
  if(!specification)
    throwException('E016')
    
  return specification
}

async function getTypeSpecificationWithPropertyAll(propertyIds) {
  let specifications = await models.TypeSpecification.findAll({
    where: { status: 'A' },
    include: [{
      model: models.Specification, include: [{ model: models.Property, 
        where: {id: {[Op.in]: propertyIds}} }]
    }],
    order: [
      ['id','asc']
    ]
  })
  if(!specifications || !specifications.length)
    throwException('E016')
  return specifications
}

async function getTypeSpecificationWithOneProperty(propertyId) {
  let specifications = await models.TypeSpecification.findAll({
    where: { status: 'A' },
    include: [{
      model: models.Specification, required: true, include: [{ model: models.Property, 
        required: true, where: {id: propertyId} }]
    }],
    order: [
      ['id','asc']
    ]
  })
  if(!specifications || !specifications.length)
    throwException('E016')
  return specifications
}

async function addTypeSpecification(data) {
  await models.sequelize.transaction(async transaction=>{
    await models.TypeSpecification.create(data,{transaction});
  });
}

async function updateTypeSpecification(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let typeSpecification = await getTypeSpecification(id);
    await typeSpecification.update(data,{transaction})
  });
}

async function deleteTypeSpecification(id) {
  let typeSpecification = await getTypeSpecification(id);
  typeSpecification.update({status:'E'})
}

module.exports = {
  getTypeSpecificationAll,
  getTypeSpecificationWithPropertyAll,
  getTypeSpecificationWithOneProperty,
  getTypeSpecification,
  addTypeSpecification,
  updateTypeSpecification,
  deleteTypeSpecification
}