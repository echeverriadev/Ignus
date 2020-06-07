const models = require("../models");
const {throwException} = require("../global/helpers");

async function getSpecificationAll(query = null) {
  let where = buildQuery(query);
  where.status = 'A';
  
  let specifications = await models.Specification.findAll({
    where,
    order: [
      ['id','asc']
    ]
  })
  if(!specifications || !specifications.length)
    throwException('E018')
  return specifications
}

async function getSpecification(id) {
  let specification = await models.Specification.findOne({
    where: { status: 'A', id },
    order: [
      ['id','asc']
    ]
  })
  if(!specification)
    throwException('E018')
    
  return specification
}

function buildQuery(query) {
  let where = {};

  if(query.type == 'c') { where = { typeInput: 'checkbox' } };
  if(query.type == 'n') { where = { typeInput: 'number' } };

  return where;
}

async function addSpecification(data) {
  await models.sequelize.transaction(async transaction=>{
    const specification = await models.Specification.create(data,{transaction});
    await specification.setTypeProperties(data.TypeProperties, {transaction});
  });
}

async function updateSpecification(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let Specification = await getSpecification(id);

    if (data.TypeProperties) {
      await Specification.setTypeProperties(data.TypeProperties);
    }

    await Specification.update(data,{transaction})
  });
}

async function deleteSpecification(id) {
  let Specification = await getSpecification(id);
  Specification.update({status:'E'})
}

module.exports = {
  getSpecificationAll,
  getSpecification,
  addSpecification,
  updateSpecification,
  deleteSpecification
}