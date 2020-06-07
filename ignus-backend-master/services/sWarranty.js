const models = require("../models");
const {throwException} = require("../global/helpers");

async function getWarranty(warranty_id) {
  const warranty = await models.Warranty.findOne({
    where: { id: warranty_id },
    include: [{
      model: models.Contract, where: {status: "A"}
    }],
    order: [
      ['id','asc'],
      [models.Contract,'id','asc']
    ]
  });
  if(!warranty) {
    throwException("E010");
  }
  return warranty;
}

async function getAllWarrantys() {
  const warrantys = await models.Warranty.findAll({
    include: [{
      model: models.Contract, where: {status: "A"}
    }],
    order: [
      ['id','asc'],
      [models.Contract,'id','asc']
    ]
  });
  return warrantys;
}

async function createWarranty(data) {
  return await models.Warranty.create(data);
}

async function updateWarranty(warranty_id, data) {
  const warranty = await models.Warranty.findByPk(warranty_id);
  if(!warranty) {
    throwException("E010")
  }
  return await warranty.update(data);
}

async function destroyWarranty(warranty_id) {
  const warranty = await models.Warranty.findByPk(warranty_id);
  if(!warranty) {
    throwException("E003")
  }
  return await warranty.destroy();
}

module.exports = {
  getWarranty,
  getAllWarrantys,
  createWarranty,
  updateWarranty,
  destroyWarranty
}