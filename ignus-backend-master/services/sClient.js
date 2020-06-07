const models = require("../models");
const sTransaction = require("./sTransaction");
const {throwException} = require("../global/helpers");
const C = require("../config/properties/constants")
const sTypeService = require("./sTypeService")

// not using for now
async function createClient(data) {
  return await models.Client.create({
    UserId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    gender: data.gender
  });
}

async function updateClient(user_id, data) {
  await models.sequelize.transaction(async transaction=>{
    const client = await getClientByUserId(user_id);
    await client.setParish(data.parish_id, {transaction});
    await client.update(data, {transaction});
  });
}

async function destroyClient(user_id) {
  const Client = await models.Client.findOne({ where: { UserId: user_id }});

  if(!Client) {
    throwException('E001')
  }

  return await Client.update({status: "E"});
}

async function getClient(client_id) {
  const client = await models.Client.findOne({
    where: { id: client_id, status: "A" },
    include: [
    {
      model: models.User, include: [{ model: models.Role }]
    },
    {
      model: models.Parish, include: [{ model: models.Municipality, include: [{ model: models.State }] }]
    },
    {
      model: models.Specification
    },
    ],
    order: [
      ['id','asc'],
      [models.User,'id','asc']
    ]
  });
  if(!client) {
    throwException("E001");
  }
  return client;
}

function getClientAll() {
  return models.Client.findAll({ 
    where: { status: "A" },
    include: [
      {
        model: models.User, include: [{ model: models.Role }]
      },
      {
        model: models.Parish, include: [{ model: models.Municipality, include: [{ model: models.State }] }]
      },
      ],
      order: [
        ['id','asc'],
        [models.User,'id','asc']
      ]
  });
}

async function getClientSpecificationAll() {
  return await models.Client.findAll({ 
    where: { status: "A" },
    include: [
      {
        model: models.Specification, required: true
      },
      ],
      order: [
        ['id','asc'],
        [models.Specification,'id','asc']
      ]
  });
}

async function setStateData(client_id, state_id) {
  await models.sequelize.transaction(async transaction=>{ 
    const client = await getClient(client_id);
    client.addState(state_id, {transaction});
    return client;
  })
}

async function addSpecificationsForClient(client_id, data) {
  await models.sequelize.transaction(async transaction=>{ 
    const client = await models.Client.findByPk(client_id, {transaction});
    if(!client)
      throwException("E001");
    await client.setSpecifications(data.specifications, {transaction});  
  });
}

async function getClientByUserId(UserId) {
  const client = await models.Client.findOne({
    where: { UserId, status: "A" }});
  if(!client) {
    throwException("E001");
  }
  return client;
}

async function getRequestClientAll(UserId) {
  const client = await getClientByUserId(UserId);
  const requests = await client.getRequests({
    include: [{
        model: models.TypeRequest,
    },{
        model: models.TypeService,
    },{
        model: models.Client,
    },{
        model: models.Employee,
    }],
    order: [
        ['requestDate','asc'],
        [models.TypeRequest,'id','asc'],
        [models.TypeService,'id','asc'],
        [models.Client,'id','asc'],
        [models.Employee,'id','asc'],
    ]
  });
  if(!requests || !requests.length)
    throwException('E023')
  return requests;
}

/*
async function getAllTransactionsClient(UserId) {
  const client = await getClientByUserId(UserId);
  const requests = await client.getRequests({
    where: {
      status: { [Op.between]: ['A', 'F'] } //Only request Aprobadas or Finalizadas have transactions
    }
  });
  
  let transactions = []
  let transaction = {}
  for(let request of requests){
    transaction = await sRequest.getTransactionByRequestId(request.id)
    transactions.push(transaction)
  }
  if(!transactions.length)
    throwException('E033')
  return transactions;
}*/

async function getAllTransactionsClient(UserId, status) {
  let client = await getClientByUserId(UserId);
  let transactions = await sTransaction.getAllTransactionsClient(client.id, status)
  return transactions;
}

async function updatePreferencesByClientId(data, ClientId) {
  await models.sequelize.transaction(async transaction => {
      let oldRequest = await models.Request.findOne({
        where: {ClientId, status: 'D'},
        include: [{model:models.Property}],
        transaction
      })
      
      if(oldRequest){ //delete the oldrequest
        const oldProperty = oldRequest.Property;
        await oldProperty.destroy({transaction})
        await oldRequest.destroy({transaction})
      }
      
			let newProperty = {
				ClientId,
				TypePropertyId: data.TypePropertyId,
				ParishId: data.ParishId,
				buildDate: data.buildDate,
				status: C.PROPERTY_DESIRED
			}
			let property = await models.Property.create(newProperty, { transaction })
			let specifications = []
			for (let typeS of data.typeSpecifications) {
				for (let spec of typeS.specifications_checkbox)
					specifications.push({
						PropertyId: property.id,
						quantity: !!spec.quantity,
						SpecificationId: spec.id
					})
				for (let spec of typeS.specifications_number)
					specifications.push({
						PropertyId: property.id,	
						quantity: parseInt(spec.quantity),
						SpecificationId: spec.id
					})
			}
			await models.PropertySpecification.bulkCreate(specifications, { transaction })
      
      data.PropertyId = property.id
      data.status = 'D'
      data.ClientId = ClientId
		  await models.Request.create(data, { transaction })
	});

}




module.exports = {
  createClient,
  updateClient,
  destroyClient,
  getClient,
  getClientAll,
  getClientByUserId,
  getClientSpecificationAll,
  setStateData,
  addSpecificationsForClient,
  getRequestClientAll,
  getAllTransactionsClient,
  updatePreferencesByClientId
}