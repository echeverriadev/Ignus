const models = require("../models");
const { throwException } = require("../global/helpers");
const { saveFile } = require("../global/fileSystem");
const sTransaction = require("./sTransaction")
const sProperty = require("./sProperty")
const C = require("../config/properties/constants");
const sNotification = require("./sNotification")

async function createContract(data, document) {
  await models.sequelize.transaction(async transaction => {
    const urlFileContract = saveFile(document.path, "contract")
    data.urlFileContract = urlFileContract
    const contract = await models.Contract.create(data, { transaction });
    if (data.warranties)
      await contract.setWarranties(data.warranties, { transaction })
    const objTransaction = await models.Transaction.findOne({
      where: { id: data.TransactionId },
      include: [{
        model: models.Request,
        include: [{
          model: models.Property
        },{
          model: models.Client
        },{
          model: models.TypeService
        },{
          model: models.Employee
        }]
      }],
      transaction
    })
    
    const newStatusTransaction = C.TRANSACTION_FINISHED
    const transactionId = objTransaction.id
    const invalidStates = C.ALL_STATUS_TRANSACTION.filter(item => {
      return item != C.TRANSACTION_PUBLISHED && item != C.TRANSACTION_RESERVED
    })
    console.log(invalidStates)
    await sTransaction.updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)
    
    if(objTransaction.status == C.TRANSACTION_RESERVED){
      const propertyId = objTransaction.Request.Property.id
      const newStatusProperty = C.PROPERTY_FINISHED;
      const invalidStates2 = C.STATUS_PROPERTY_WITHOUT(C.PROPERTY_RESERVED) //Only properties reserved         
      await sProperty.updateStatus(propertyId, newStatusProperty, invalidStates2, transaction)
    }
    
    const UserId = objTransaction.Request.Client.UserId;
    const text = `${objTransaction.Request.TypeService.name}, agente: ${objTransaction.Request.Employee.firstName} ${objTransaction.Request.Employee.lastName} - ${C.STATUS_TRANSACTION_STR[newStatusTransaction]}`
    await sNotification.addNotification(UserId, text, 13)
  })

}

async function updateContract(id, data, document = null) {
  const contract = await models.Contract.findByPk(id);

  if (!contract) {
    throwException('E012')
  }

  if (document) {
    const urlFileContract = saveFile(document.path, "contract");
    data.urlFileContract = urlFileContract;
  }

  return await contract.update(data);
}

async function destroyContract(id) {
  const contract = await models.Contract.findByPk(id);

  if (!contract) {
    throwException('E012')
  }

  return await contract.update({ status: "E" });
}

async function getContract(id) {
  const contract = await models.Contract.findOne({
    where: { id: id, status: "A" },
    include: [
      { model: models.Warranty },
      {
        model: models.Transaction,
        include: [{
          model: models.Request,
          include: [
            { model: models.Employee },
            { model: models.Client },
            { model: models.Property, include: [{ model: models.Client }, { model: models.TypeService }] },
          ]
        }]
      }
    ],
    order: [
      ['id', 'asc'],
      [models.Warranty, 'id', 'asc']
    ]
  });
  if (!contract) {
    throwException("E012");
  }
  return contract;
}

async function getContractAll() {
  return await models.Contract.findAll({
    where: { status: "A" },
    include: [{
      model: models.Warranty
    }, {
      model: models.Transaction,
      include: [{
        model: models.Request,
        include: [
          { model: models.Employee },
          { model: models.Client },
          { model: models.Property, include: [{ model: models.Client }, { model: models.TypeService }] },
        ]
      }]
    }],
    order: [
      ['id', 'asc'],
      [models.Warranty, 'id', 'asc']
    ]
  });
}

async function getWarrantyForContract(id) {
  let contract = await models.Contract.findByPk(id)
  if (!contract)
    throwException('E012');
  let warranties = await contract.getWarranties();
  if (!warranties || !warranties.length)
    throwException('E010');

  return warranties;
}

module.exports = {
  createContract,
  updateContract,
  destroyContract,
  getContract,
  getContractAll,
  getWarrantyForContract
}
