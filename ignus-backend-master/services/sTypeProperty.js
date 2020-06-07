const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypePropertyAll() {
  let TypePropertys = await models.TypeProperty.findAll({
    where: { status: 'A' },
    include: [
      {
        model: models.Property, include: [
          { model: models.Promotion },
          { model: models.TypeService }
        ]
      },
      { model: models.Specification },
    ],
    order: [
      ['id','asc']
    ]
  })
  if(!TypePropertys || !TypePropertys.length)
    throwException('E032')
  return TypePropertys
}

async function getTypeProperty(id) {
  let Property = await models.TypeProperty.findOne({
    where: { status: 'A', id },
    include: [
      {
        model: models.Property, include: [
          { model: models.Promotion },
          { model: models.TypeService }
        ]
      },
      { model: models.Specification },
    ],
    order: [
      ['id','asc']
    ]
  })
  if(!Property)
    throwException('E032')
    
  return Property
}
 
async function getSpecificationsForTypeProperty(id) {
  let typeProperty = await models.TypeProperty.findByPk(id)
  if(!typeProperty)
    throwException('E032')
  
  // We need the specifications for Each TypeSpecification
  let typeSpecifications = await models.TypeSpecification.findAll({
    where: { status: "A" },
    include: [{ model: models.Specification, where: { status: "A"}, 
    include: [{ model: models.TypeProperty, where: { status: "A", id: typeProperty.id } }] }]
  })

  if(!typeSpecifications || !typeSpecifications.length)
    throwException('E016')
    
  return typeSpecifications
}


async function addTypeProperty(data) {
  await models.sequelize.transaction(async transaction=>{
    const typeProperty = await models.TypeProperty.create(data,{transaction});
    await typeProperty.setSpecifications(data.specifications, {transaction});
  });
}

async function updateTypeProperty(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let typeProperty = await getTypeProperty(id);
    await typeProperty.setSpecifications(data.specifications, {transaction});
    await typeProperty.update(data,{transaction})
  });
}

async function deleteTypeProperty(id) {
  let typeProperty = await getTypeProperty(id);
  typeProperty.update({status:'E'})
}

module.exports = {
  getTypePropertyAll,
  getTypeProperty,
  getSpecificationsForTypeProperty,
  addTypeProperty,
  updateTypeProperty,
  deleteTypeProperty
}