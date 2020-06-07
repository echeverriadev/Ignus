const models = require("../models");
const { throwException, Op } = require("../global/helpers");
const mailer = require('../global/mailer');
const sTransaction = require("./sTransaction")

const C = require("../config/properties/constants")
const sUser = require("./sUser");


async function getIncidence(id) {
  const incidence = await models.Incidence.findOne({
    where: { id: id, status: {
        [Op.ne]: 'B' } },
    include: [{
      model: models.Transaction,
      include: [{
        model: models.Request,
        include: [{
          model: models.Client,
          include: [{ model: models.User }]
        }, {
          model: models.Employee,
        }, {
          model: models.TypeService,
        }],
      }]
    }, {
      model: models.TypeIncidence,
    }],
  });
  if (!incidence) {
    throwException("E014");
  }
  return await incidence;
}

async function getAllIncidence(userId) {
  let where = { status: {
      [Op.ne]: 'B' } }
  if (userId)
    where = {
      status: {
        [Op.ne]: 'B' },
      [Op.or]: [
        { '$Transaction.Request.Client.UserId$': userId },
        { '$Transaction.Request.Employee.UserId$': userId }
      ]
    }
  return await models.Incidence.findAll({
    where,
    include: [{
      model: models.Transaction,
      include: [{
        model: models.Request,
        include: [{
          model: models.Client,
          include: [{ model: models.User }]
        }, {
          model: models.Employee,
        }, {
          model: models.TypeService,
        }],
      }]
    }, {
      model: models.TypeIncidence,
    }],
    order: [
      ['id', 'asc'],
      [models.Transaction, 'id', 'asc']
    ]
  });
}

async function createIncidence(data) {
  await models.sequelize.transaction(async transaction => {
    
    const objTransaction = await models.Transaction.findOne({
      where: {id: data.TransactionId}
    })
    data.transactionStatus = objTransaction.status
    await models.Incidence.create(data)

    const newStatusTransaction = C.TRANSACTION_INCIDENCE;
    const transactionId = data.TransactionId
    const invalidStates = [C.TRANSACTION_CANCELED,C.TRANSACTION_FINISHED,C.TRANSACTION_INCIDENCE,C.TRANSACTION_QUALIFIED]
    await sTransaction.updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)
  });
}

async function updateIncidence(id, data) {
  const incidence = await models.Incidence.findByPk(id);
  if (!incidence) {
    throwException("E014");
  }
  return await incidence.update(data);
}

async function destroyIncidence(id) {
  const incidence = await models.Incidence.findByPk(id);
  if (!incidence) {
    throwException("E014");
  }
  return await incidence.update({ status: "B" });
}

async function respondIncidence(id, data) {
  await models.sequelize.transaction(async transaction => {
    const incidence = await getIncidence(id);
    if (incidence.status == 'A')
      throwException("E057");

    //If decision is true, the transaction is canceled, otherwise is continued
    const statusTransaction = incidence.transactionStatus
    console.log(statusTransaction)
    const newStatusTransaction = data.decision ? C.TRANSACTION_CANCELED : statusTransaction;
    const transactionId = incidence.Transaction.id
    const invalidStates = C.STATUS_TRANSACTION_WITHOUT(C.TRANSACTION_INCIDENCE) //The transaction must be in "Incidencia (I)"
    console.log(invalidStates)
    await sTransaction.updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)

    await incidence.update({
      status: "A",
      decision: data.decision,
      conclusion: data.message
    }, { transaction });

    let user_email = incidence.Transaction.Request.Client.User.username;
    const emailData = { email: user_email, message: data.message, decision: data.decision ? "Transacción cancelada" : "Transacción continua" }
    mailer.sendIncidenceRespond(emailData)

  });
}

async function getIncidenceByIdAndStatus(id, status) {
  const incidence = await models.Incidence.findOne({
    where: { id, status },
    include: [{
      model: models.Transaction,
      include: [{
        model: models.Request,
        include: [{
          model: models.Client,
          include: [{ model: models.User }]
        }, {
          model: models.Employee,
        }, {
          model: models.TypeService,
        }],
      }]
    }, {
      model: models.TypeIncidence,
    }],
  });
  return await incidence;
}

async function getCountIncidencesByUserId(userId) {
  await sUser.getUserById(userId);
  let count = await models.Incidence.count({
    where: {
      [Op.or]: [
        { '$Transaction.Request.Client.UserId$': userId },
        { '$Transaction.Request.Employee.UserId$': userId }
      ]
    },
    include: [{
      model: models.Transaction,
      include: [{
        model: models.Request,
        include: [{
          model: models.Client,
        }, {
          model: models.Employee,
        }],
      }]
    }]
  });

  return count
}

module.exports = {
  getIncidence,
  getAllIncidence,
  createIncidence,
  updateIncidence,
  destroyIncidence,
  respondIncidence,
  getIncidenceByIdAndStatus,
  getCountIncidencesByUserId
}
