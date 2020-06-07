const models = require("../models");
const {throwException} = require("../global/helpers");

async function getColor(id) {
  const color = await models.Color.findOne({
    where: { id: id, status: "A" },
    order: [
      ['id','asc']
    ]
  });

  if(!color) {
    throwException("E036");
  }
  return await color;
}

async function getAllColor() {
  return await models.Color.findAll({
    where: { status: "A" },
    order: [
      ['id','asc'],
    ]
  });
}

async function createColor(data) {
  return await models.Color.create(data);
}

async function updateColor(id, data) {
  const color = await models.Color.findByPk(id);
  if(!color) {
    throwException("E036");
  }
  return await color.update(data);
}

async function destroyColor(id) {
  const color = await models.Color.findByPk(id);
  if(!color) {
    throwException("E036");
  }
  return await color.update({status: "E"});
}

module.exports = {
  getColor,
  getAllColor,
  createColor,
  updateColor,
  destroyColor
}