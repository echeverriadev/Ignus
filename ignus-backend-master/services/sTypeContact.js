const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeContact(id) {
  const typeContact = models.TypeContact.findOne({
    where: { status: 'A', id: id },
    include: [
      { model: models.Contact, include: [{ model: models.User, include: [{ model: models.Client }] }] }
    ]
  });
  if(!typeContact) {
    throwException("E003");
  }
  return await typeContact;
}

async function getAllTypeContact() {
  return await models.TypeContact.findAll({
    where: { status: 'A' },
    include: [
      { model: models.Contact, include: [{ model: models.User, include: [{ model: models.Client }] }] }
    ]
  });
}

async function createTypeContact(data) {
  return await models.TypeContact.create(data);
}

async function updateTypeContact(id, data) {
  const typeContact = await models.TypeContact.findByPk(id);
  if(!typeContact) {
    throwException("E003");
  }
  return await typeContact.update(data);
}

async function destroyTypeContact(id) {
  const typeContact = await models.TypeContact.findByPk(id);
  if(!typeContact) {
    throwException("E003");
  }
  return await typeContact.destroy();
}

module.exports = {
  getTypeContact,
  getAllTypeContact,
  createTypeContact,
  updateTypeContact,
  destroyTypeContact
}