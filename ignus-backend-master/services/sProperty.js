const models = require("../models");
const { throwException, Op } = require("../global/helpers");
const C = require("../config/properties/constants");
const sPublication = require("./sPublication");
const sClient = require("./sClient");
const mailer = require('../global/mailer');

async function getPropertysAll() {
  return await models.Property.findAll({
    include: [
      { model: models.Client, include: [{ model: models.User }] },
      { model: models.TypeService },
      { model: models.TypeProperty },
      { model: models.Promotion },
      {
        model: models.Parish,
        include: [{
          model: models.Municipality,
          include: [{
            model: models.State
          }]
        }]
      },
      { model: models.Specification, include: [{ model: models.TypeSpecification }] }
    ]
  })
}

async function getPropertysCatalogueAll(query) {
  let where = buildQuery(query);
  where.status = C.PROPERTY_PUBLISHED;
  console.log("QUERY: ", where);

  return await models.Property.findAll({
    where,
    include: [
      { model: models.Client, include: [{ model: models.User }] },
      { model: models.TypeService },
      { model: models.TypeProperty },
      { model: models.Promotion },
      { model: models.Publication, include: [{ model: models.Image }] },
      {
        model: models.Parish,
        include: [{
          model: models.Municipality,
          include: [{
            model: models.State
          }]
        }]
      },
      { model: models.Specification }
    ],
    order: [
      ['id', 'asc'],
      [models.Publication, models.Image, 'id', 'asc'],
    ]
  })
}

async function getProperty(id) {
  let Property = await models.Property.findOne({
    where: { id },
    include: [
      { model: models.Client, include: [{ model: models.User }] },
      { model: models.TypeProperty },
      { model: models.TypeService },
      { model: models.Promotion },
      { model: models.Publication },
      {
        model: models.Parish,
        include: [{
          model: models.Municipality,
          include: [{
            model: models.State
          }]
        }]
      },
      { model: models.Specification }
    ]
  })
  if (!Property)
    throwException('E022')
  return Property;
}

async function addPendingProperty(data, image) {
  await models.sequelize.transaction(async transaction => {
    const property = await models.Property.create(data, { transaction });
    const client = await sClient.getClientByUserId(data.UserId);
    await property.setClient(client, { transaction });

    if (data.specifications_checkbox)
      await property.setSpecifications(data.specifications_checkbox, { transaction });
    if (data.specifications_number)
      await property.setSpecifications(data.specifications_number, { transaction });

    // const publication = await sPublication.addPublication(data, transaction, image);
    // await property.setPublication(publication, {transaction});
  });
}

async function addTransaction(propertyId, transactionId) {
  await models.sequelize.transaction(async transaction => {
    let property = await models.Property.findByPk(propertyId);

    if (!property)
      throwException('E022')

    let transactionModel = await sTransaction.getTransactionById(transactionId, { transaction });
    property.addTransaction(transactionModel);
    await property.update({ status: 'A' }, { transaction });
  });
}

async function createPublication(data, image, transactionId) {
  await models.sequelize.transaction(async transaction => {
    const sTransaction = require("./sTransaction"); //Yes, I know, this shouldn't be here
    //But if not, this happens => sTransaction.updateStatus is not a function

    const publication = await sPublication.addPublication(data, transaction, image);
    const currentTransaction = await models.Transaction.findOne({
      where: { id: transactionId },
      include: [{ model: models.Request, include: [{ model: models.Property }] }]
    });


    if (!currentTransaction)
      throwException('E027');

    const property = currentTransaction.Request.Property;


    await property.setPublication(publication, { transaction });

    const newStatusProperty = C.PROPERTY_PUBLISHED;
    const invalidStates2 = C.STATUS_PROPERTY_WITHOUT(C.PROPERTY_INITIAL) //Only properties reserved         
    await updateStatus(property.id, newStatusProperty, invalidStates2, transaction)
    const newTypeServiceId = C.TYPE_SERVICE_OPPOSITE_ID[currentTransaction.Request.TypeServiceId]
    console.log(newTypeServiceId)
    await property.setTypeService(newTypeServiceId, {transaction})

    const invalidStates = C.STATUS_TRANSACTION_WITHOUT(C.TRANSACTION_COMPLETED)
    await sTransaction.updateStatus(currentTransaction.id, C.TRANSACTION_PUBLISHED, invalidStates, transaction);
    //await property.update({status:'P'},{transaction});
    
    matchPropertyPublishedWithClients(property)
  })
}

async function updateProperty(id, data) {
  const property = await models.Property.findByPk(id);
  if (!property)
    throwException('E022');

  await models.sequelize.transaction(async transaction => {
    if (data.specifications_checkbox) {
      let ids = [];
      for (let spec of data.specifications_checkbox) {
        ids.push(spec.id);
      }
      await property.setSpecifications(ids, { transaction });
    }
    if (data.specifications_number) {
      let ids = [];
      for (let spec of data.specifications_number) {
        ids.push(spec.id);
      }
      await property.setSpecifications(ids, { transaction });
    }

    property.update(data, { transaction });
  })
}

function buildQuery(query) {
  let where = {};

  if (query.typeP) {
    let ids = query.typeP.split(",");
    where['$TypeProperty.id$'] = {
      [Op.in]: ids }
  }
  if (query.typeS) {
    let ids = query.typeS.split(",");
    where['$TypeService.id$'] = {
      [Op.in]: ids }
  }
  if (query.state) { where['$Parish.Municipality.State.name$'] = query.state }
  if (query.municipality) { where['$Parish.Municipality.name$'] = query.municipality }
  if (query.parish) { where['$Parish.name$'] = query.parish }

  return where;
}


async function getPropertyByIdSimplified(propertyId) {
  let property = await models.Property.findOne({
    where: { id: propertyId },
  })

  if (!property)
    throwException('E022')

  return property
}

function trowExceptionStatusProperty(status) {
  throwException(C.MESSAGES_BY_PROPERTY_STATUS[status])
}

/*
    propertyId: integer,
    newState: char,
    invalidStates: array of char
    transactionSequelize: Sequelize Object
*/
async function updateStatus(propertyId, newState, invalidStates, transactionSequelize) {
  let property = await getPropertyByIdSimplified(propertyId);

  const currentStatus = property.status
  if (invalidStates.includes(currentStatus))
    trowExceptionStatusProperty(currentStatus)

  await property.update({ status: newState }, { transaction: transactionSequelize })
}

async function matchTwoProperties(propertyIdPublished, propertyIdDesired) {
  const specificationPublished = await models.PropertySpecification.findAll({
    where: { PropertyId: propertyIdPublished },
    order: [
      ['SpecificationId', 'asc'],
    ]
  })
  const specificationDesired = await models.PropertySpecification.findAll({
    where: { PropertyId: propertyIdDesired },
    order: [
      ['SpecificationId', 'asc'],
    ]
  })

  const totalSpecifications = specificationDesired.length
  const percentBySpecification = 1 * 100 / totalSpecifications
  let percentMatch = 0.00;
  for (let i = 0; i < totalSpecifications; i++) {
    const quantityPublished = specificationPublished[i].quantity
    const quantityDesired = specificationDesired[i].quantity
    //console.log(quantityPublished, quantityDesired)
    if (typeof quantityPublished === typeof true) { //Check is boolean (checkbox)
      if (quantityPublished === quantityDesired)
        percentMatch += percentBySpecification;
    }
    else {
      const intervalValid = Math.floor(quantityPublished / 2)
      const [lowerLimit, upperLimit] = [intervalValid, quantityPublished + intervalValid]
      const distancePublishedTolowerLimit = Math.abs(quantityPublished - lowerLimit)
      const distanceDesiredToLimit = Math.abs(quantityDesired - lowerLimit)
      const proportionByQuantity = distancePublishedTolowerLimit ? 1.0 / distancePublishedTolowerLimit : 1
      if (quantityDesired >= lowerLimit && quantityDesired <= upperLimit)
        percentMatch += distanceDesiredToLimit * proportionByQuantity * percentBySpecification
    }
  }
  var roundedString = percentMatch.toFixed(2);
  var rounded = Number(roundedString);
  return rounded
}

async function matchPropertyPublishedWithClients(propertyPublished) {

  const desiredProperties = await models.Property.findAll({
    where: {
      status: C.PROPERTY_DESIRED,
      TypePropertyId: propertyPublished.TypePropertyId
    }
  })

  const agency = await models.Agency.findOne({ where: { id: 1 } });
  const minPercentMatch = agency.minPercentMatch || 50.00
  for (let desiredProperty of desiredProperties) {
    const percentMatch = await matchTwoProperties(propertyPublished.id, desiredProperty.id)
    if (percentMatch >= minPercentMatch) {
      await notifyMatchProperty(propertyPublished.id,desiredProperty.id, percentMatch)
    }
  }
}

async function notifyMatchProperty(propertyIdPublished, propertyIdDesired, percent) {
  const propertyDesired = await models.Property.findOne({
    where: { id: propertyIdDesired },
    include: [{
      model: models.Client,
      include: [{ model: models.User }]
    }]
  })

  const propertyPublished = await models.Property.findOne({
    where: { id: propertyIdPublished },
    include: [{
      model: models.Parish,
      include: [{
        model: models.Municipality,
        include: [{
          model: models.State
        }]
      }]
    },{
     model: models.TypeService 
    },{
      model: models.Publication, include: [{ model: models.Image }]
    },{
      model: models.TypeProperty
    }]
  })
  
  const emailData = {
    email: propertyDesired.Client.User.username,
    fullname: `${propertyDesired.Client.firstName} ${propertyDesired.Client.lastName}`,
    urlImage: propertyPublished.Publication.Images[0].url,
    typeProperty: propertyPublished.TypeProperty.name,
    typeService: propertyPublished.TypeService.name,
    state: propertyPublished.Parish.Municipality.State.name,
    municipality: propertyPublished.Parish.Municipality.name,
    parish: propertyPublished.Parish.name,
    ubication: propertyPublished.ubication,
    propertyId: propertyPublished.id,
    percent
  }
  
  //console.log(emailData)
  mailer.sendProperty(emailData)
}

async function getPropertyDesiredPreferencesClient(userId) {
  let Property = await models.Property.findOne({
    include: [
      { model: models.Request, where: {status: 'D'} },
      { model: models.Client, include: [{ model: models.User, where:{id: userId} }] },
      { model: models.TypeProperty },
      { model: models.TypeService },
      { model: models.Promotion },
      { model: models.Publication },
      {
        model: models.Parish,
        include: [{
          model: models.Municipality,
          include: [{
            model: models.State
          }]
        }]
      },
      { model: models.Specification }
    ]
  })
  if (!Property)
    throwException('E089')
  return Property;
}


module.exports = {
  getPropertysAll,
  getPropertysCatalogueAll,
  getProperty,
  createPublication,
  addPendingProperty,
  addTransaction,
  updateProperty,
  updateStatus,
  matchTwoProperties,
  notifyMatchProperty,
  matchPropertyPublishedWithClients,
  getPropertyDesiredPreferencesClient
}
