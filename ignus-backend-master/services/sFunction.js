const models = require("../models");
const {throwException} = require("../global/helpers");
const { Op } = require("../global/helpers");

async function getFunction(function_id) {
  const auxFunction = await models.Function.findOne({
    where: { id: function_id },
    include: [
      { model: models.Role },
      { model: models.Function, as: 'children' }
    ],
    order: [
      ['id','asc'],
      [models.Role,'id','asc']
    ]
  });
  if(!auxFunction) {
    throwException("E003");
  }
  return auxFunction;
}

async function getAllFunctions() {
  const functions = await models.Function.findAll({
    include: [
      { model: models.Role },
      { model: models.Function, as: 'children' },
    ],
    order: [
      ['id','asc'],
      [models.Role,'id','asc']
    ]
  });
  return functions;
}

async function getFunctionsByUniqIds(idFunctionsLeaf, typeApp = 'I') {
  const functions = await models.Function.findAll({
    where: { typeApplication: typeApp, [Op.or]: [
        {
          id: {[Op.in]: idFunctionsLeaf} 
        },
        {
          '$children.id$': { [Op.in]: idFunctionsLeaf }
        },  
        {
          '$children.children.id$': { [Op.in]: idFunctionsLeaf }
        }
      ],
      parent_id: { [Op.eq]: null } 
    },
    include: [
      { model: models.Function, as: 'children', include: [{
        model: models.Function, as: 'children'
      }] },
    ],
    order: [
      ['id','asc'],
      ['children','id','asc'],
      ['children','children','id','asc'],
    ]
  });
  return functions;
}

async function getLinkableFunctions() {
  const functions = await models.Function.findAll({
    where: { link: { [Op.ne]: null } },
    include: [
      { model: models.Function, as: 'children', include: [{
        model: models.Function, as: 'children'
      }] },
    ],
    order: [
      ['id','asc'],
    ]
  });
  return functions;
}

async function createFunction(data) {
  return await models.Function.create(data);
}

async function updateFunction(function_id, data) {
  const auxFunction = await models.Function.findByPk(function_id);
  if(!auxFunction) {
    throwException("E003")
  }
  return await auxFunction.update(data);
}

async function destroyFunction(function_id) {
  const auxFunction = await models.Function.findByPk(function_id);
  if(!auxFunction) {
    throwException("E003")
  }
  return await auxFunction.destroy();
}

async function getRolesForFunction(id) {
  let auxFunction = await models.Function.findByPk(id)
  if(!auxFunction)
    throwException('E003');
  let roles = await auxFunction.getRoles();
  if(!roles || !roles.length)
    throwException('E004');
    
  return roles
}

module.exports = {
  getFunction,
  getFunctionsByUniqIds,
  getLinkableFunctions,
  getAllFunctions,
  createFunction,
  updateFunction,
  destroyFunction,
  getRolesForFunction
}