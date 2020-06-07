const models = require("../models");
const {throwException, Op} = require("../global/helpers");
const helper = require("../global/helpers");
const { saveFile } = require("../global/fileSystem")
const sNotification = require("./sNotification")
const sProperty = require("./sProperty")
const sUser = require("./sUser");

const C = require("../config/properties/constants")


async function addTransaction(RequestId, typeService, transaction) {
    let objTransaction = await models.Transaction.create({RequestId},{transaction});
    let requirements = await typeService.getRequirements({where:{status:'A'}},{transaction})
    let activities = await typeService.getActivities({where:{status:'A'}},{transaction})
    let activitiesId = activities.map(item => item.id);
    let requirementsId = requirements.map(item => item.id);
    await objTransaction.setActivities(activitiesId,{transaction})
    await objTransaction.setRequirements(requirementsId,{transaction})
    
    
    let firstActivity = await models.TransactionActivity.findOne(
        {
            where: { TransactionId: objTransaction.id, ActivityId: 1 },
            transaction
        }
    )
    
    await firstActivity.update(
        {
            status:"A",
            reviewDate: helper.getCurrentDate()
        },
        {
            transaction
        }
    )
    
    //For set the next activity as next to execute, if it doesn't have next no matter
    await models.TransactionActivity.update(
        { nextToExecute: true },
        { 
            where: { id: firstActivity.id + 1, TransactionId: objTransaction.id },
            transaction
        }
    )
}

async function getTransactionsAll(status) {
    let transactions = await models.Transaction.findAll({
        where: { status: { [Op.in]: status } },
        include: [{
            model: models.Activity,
        },
        {
            model: models.Requirement,
        },
        {
            model: models.Request,
            include: [{
                model: models.TypeRequest,
            },{
                model: models.TypeService,
            },{
                model: models.Client,
            },{
                model: models.Employee,
            },{
                model: models.Property,
                include: [{
                    model: models.Client,
                },{
                    model: models.TypeProperty,
                },{
                    model: models.TypeService,
                }]
            },
            ],
        }],
        order: [
            ['id','asc'],
            [models.Activity,'id','asc'],
            [models.Requirement,'id','asc'],
        ]
    })
    
    if(!transactions || !transactions.length)
        throwException('E027')
        
    
    return transactions
}

async function getTransactionsAllByUserId(status, userId, offeringProperty) {
    
    const where = buildQuery(status, userId, offeringProperty)
    
    let transactions = await models.Transaction.findAll({
        where,
        include: [{
            model: models.Activity,
        },
        {
            model: models.Requirement,
        },
        {
            model: models.Request,
            include: [{
                model: models.TypeRequest,
            },{
                model: models.TypeService,
            },{
                model: models.Client,
            },{
                model: models.Employee,
            },{
                model: models.Property,
                include: [{
                    model: models.Client,
                },{
                    model: models.TypeProperty,
                },{
                    model: models.TypeService,
                }]
            },
        
            ],
        }],
        order: [
            ['id','asc'],
            [models.Activity,'id','asc'],
            [models.Requirement,'id','asc'],
        ]
    })
    
    if(!transactions || !transactions.length)
        throwException('E027')
        
    
    return transactions
}

function buildQuery(status, userId, offeringProperty){
    let where = {}
    if(status){
        where.status = { [Op.in]: status }    
    }
    if(userId){
      where[Op.or] = [
              { '$Request.Client.UserId$': userId },
              { '$Request.Employee.UserId$': userId }
            ]  
    }
    
    if(offeringProperty!=undefined && offeringProperty!=""){
      where['$Request.TypeService.offeringProperty$'] = offeringProperty  
    }
    
    return where;
}

async function getTransactionById(transactionId) {
    let transaction = await models.Transaction.findOne({
        where: { id: transactionId },
        include: [{
            model: models.Activity,
        },
        {
            model: models.Requirement,
        },
        {
            model: models.Request,
            include: [{
                model: models.TypeRequest,
            },{
                model: models.TypeService,
            },{
                model: models.Client,
            },{
                model: models.Employee,
            },{
                model: models.Property,
                include: [{
                    model: models.Client,
                },{
                    model: models.TypeProperty,
                },{
                    model: models.TypeService,
                }]
            },
            
            ],
        }],
        order: [
            ['id','asc'],
            [models.Activity,'id','asc'],
            [models.Requirement,'id','asc'],
        ]
    })
    
    if(!transaction)
        throwException('E029')
        
    return transaction
}

async function getAllTransactionsEmployee(EmployeeId, status) {
    let transactions = await models.Transaction.findAll({
        where: { status: { [Op.in]: status } },
        include: [{
            model: models.Activity,
        },
        {
            model: models.Requirement,
        },
        {
            model: models.Request,
            include: [{
                model: models.TypeRequest,
            },{
                model: models.TypeService,
            },{
                model: models.Client,
            },{
                model: models.Employee,
                where: { id: EmployeeId },
                required: true
            },{
                model: models.Property,
                include: [{
                    model: models.Client,
                },{
                    model: models.TypeProperty,
                },{
                    model: models.TypeService,
                }]
            },
        
            ],
            required: true
        }],
        order: [
            ['id','asc'],
            [models.Activity,'id','asc'],
            [models.Requirement,'id','asc'],
        ]
    })
    
    if(!transactions || !transactions.length)
        throwException('E027')
        
    
    return transactions
}

async function getAllTransactionsClient(ClientId, status) {
    let transactions = await models.Transaction.findAll({
        where: { status: { [Op.in]: status } },
        include: [{
            model: models.Activity,
        },
        {
            model: models.Requirement,
        },
        {
            model: models.Request,
            include: [{
                model: models.TypeRequest,
            },{
                model: models.TypeService,
            },{
                model: models.Client,
                where: { id: ClientId },
                required: true
            },{
                model: models.Employee,
            },{
                model: models.Property,
                include: [{
                    model: models.Client,
                },{
                    model: models.TypeProperty,
                },{
                    model: models.TypeService,
                }]
            },
            ],
            required: true
        }],
        order: [
            ['id','asc'],
            [models.Activity,'id','asc'],
            [models.Requirement,'id','asc'],
        ]
    })
    
    if(!transactions || !transactions.length)
        throwException('E027')
        
    
    return transactions
}

async function getAllServicesForTransactionsEmployee(userId) {
    let data = [];
    let transactions = await models.Transaction.findAll({
        include: [
            { model: models.Request, required: true, include: [
                { model: models.TypeService },
                { model: models.Employee, where: { UserId: userId },required: true }
            ] }
        ]
    });
    
    for (transaction of transactions) {
        let service = transaction.Request.TypeService;
        let index = data.findIndex(function(x) { return x.name == service.name });
        
        if (index == -1) {
            data.push({name: service.name, value: 1});
        } else {
            data[index]['value'] += 1;
        }
    }
    return data;
};

async function approveRequirementByTransactionId(TransactionId,RequirementId) {
    await models.sequelize.transaction(async transaction=>{
        let objTransaction =  await getTransactionById(TransactionId)
        let requirement = await objTransaction.getRequirements({
                                        where: {
                                            id: RequirementId,
                                            '$TransactionRequirement.status$': { [Op.in]: ['E', 'R'] }
                                        },
                                    }
                                );
        if(!requirement || !requirement.length)
            throwException('E037');
            
        let transactionRequirement = requirement[0].TransactionRequirement;
        await transactionRequirement.update({
            status:"A",
            reviewDate: helper.getCurrentDate(),
            observation: null,
        })
        
        const UserId = objTransaction.Request.Client.UserId;
        const text = `${objTransaction.Request.TypeService.name} agente: ${objTransaction.Request.Employee.firstName} ${objTransaction.Request.Employee.lastName} - ${objTransaction.statusStr}`
        
        await checkTransactionIsCompleted(TransactionId, transaction)
        await sNotification.addNotification(UserId, text, 1)
        
    })
    /* 
    Another way but without be able to do validations
    let affectedRows = await models.TransactionRequirement.update(
        {status:"A"},
        {
            where: { TransactionId, RequirementId,  status: { [Op.in]: ['E', 'R'] } }
        })
    */
}

async function uploadRequirementByTransactionId(TransactionId, requirementId, file) {
    let transaction =  await getTransactionById(TransactionId)
    let requirement = await transaction.getRequirements({
                                    where: {
                                        id: requirementId,
                                        '$TransactionRequirement.status$': { [Op.in]: ['E', 'R'] }
                                    },
                                }
                            );
    if(!requirement || !requirement.length)
        throwException('E037');
        
    const urlFileRequirement = saveFile(file.path,'requirement'); 
    let transactionRequirement = requirement[0].TransactionRequirement;
    await transactionRequirement.update({
        uploadDate: helper.getCurrentDate(),
        urlFileRequirement,
        status: 'E',
        observation: null
    })
    
}

async function rejectRequirementByTransactionId(TransactionId, fields) {
    let transaction =  await getTransactionById(TransactionId)
    const { observation, requirementId } = fields;
    let requirement = await transaction.getRequirements({
                                    where: {
                                        id: requirementId,
                                        '$TransactionRequirement.status$': 'E'
                                    },
                                }
                            );
    if(!requirement || !requirement.length)
        throwException('E039');
        
    let transactionRequirement = requirement[0].TransactionRequirement;
    await transactionRequirement.update({
        status:"R",
        reviewDate: helper.getCurrentDate(),
        observation
    })
    
    const UserId = transaction.Request.Client.UserId;
    const text = `${transaction.Request.TypeService.name} agente: ${transaction.Request.Employee.firstName} ${transaction.Request.Employee.lastName} - ${transaction.statusStr}`
    
    await sNotification.addNotification(UserId, text, 2)
}


async function approveActivityByTransactionId(TransactionId,ActivityId) {
    await models.sequelize.transaction(async transaction=>{
        let objTransaction =  await getTransactionById(TransactionId)
        let activity = await objTransaction.getActivities({
                                        where: {
                                            id: ActivityId,
                                            '$TransactionActivity.status$': { [Op.in]: ['E', 'R'] }
                                        },
                                    }
                                );
        if(!activity || !activity.length)
            throwException('E041');
            
        let transactionActivity = activity[0].TransactionActivity;
        
        //Only can execute the current activity unless it is the first (Suscribirse al sistema)
        if(!transactionActivity.nextToExecute && ActivityId!=1) 
            throwException('E043');
            
        await transactionActivity.update({
            status:"A",
            reviewDate: helper.getCurrentDate(),
            observation: null,
            nextToExecute: false
        }, {transaction})
        
        //For set the next activity as next to execute, if it doesn't have next no matter
        await models.TransactionActivity.update(
            { nextToExecute: true },
            { where: { id: transactionActivity.id + 1, TransactionId }, transaction }
        )
        
        const UserId = objTransaction.Request.Client.UserId;
        const text = `${objTransaction.Request.TypeService.name} agente: ${objTransaction.Request.Employee.firstName} ${objTransaction.Request.Employee.lastName} - ${objTransaction.statusStr}`
        
        await checkTransactionIsCompleted(TransactionId, transaction)
        await sNotification.addNotification(UserId, text, 3)
    })
}

async function rejectActivityByTransactionId(TransactionId, fields) {
    let transaction =  await getTransactionById(TransactionId)
    const { activityId, observation } = fields
    let activity = await transaction.getActivities({
                                    where: {
                                        id: activityId,
                                        '$TransactionActivity.status$': 'E'
                                    },
                                }
                            );
    if(!activity || !activity.length)
        throwException('E045');
        
    let transactionActivity = activity[0].TransactionActivity;
    
    //Only can execute the current activity unless it is the first (Suscribirse al sistema)
    if(!transactionActivity.nextToExecute && activityId!=1) 
        throwException('E043');
        
    await transactionActivity.update({
        status: "R",
        reviewDate: helper.getCurrentDate(),
        observation
    })
    
    const UserId = transaction.Request.Client.UserId;
    const text = `${transaction.Request.TypeService.name} agente: ${transaction.Request.Employee.firstName} ${transaction.Request.Employee.lastName} - ${transaction.statusStr}`
    
    await sNotification.addNotification(UserId, text, 4)
}

async function getTransactionByIdSimplified(transactionId) {
    let transaction = await models.Transaction.findOne({
        where: { id: transactionId },
         include: [
        {
            model: models.Request,
            include: [{
                model: models.Client,
            },{
                model: models.Employee,
            },{
                model: models.TypeService,
            },]
        }]
    })
    
    if(!transaction)
        throwException('E029')
        
    return transaction
}

/*
    transactionId: integer,
    newState: char,
    invalidStates: array of char
    transactionSequelize: Sequelize Object
*/
async function updateStatus(transactionId, newState, invalidStates, transactionSequelize) {
    let objTransaction = await getTransactionByIdSimplified(transactionId);
    
    const currentStatus = objTransaction.status
    if(invalidStates.includes(currentStatus))
        trowExceptionStatusTransaction(currentStatus)
    
    await objTransaction.update(
        { status: newState },
        { transaction: transactionSequelize }
    )
    
    const UserId = objTransaction.Request.Client.UserId;
    const text = `${objTransaction.Request.TypeService.name}, agente: ${objTransaction.Request.Employee.firstName} ${objTransaction.Request.Employee.lastName} - ${C.STATUS_TRANSACTION_STR[currentStatus]} -> ${C.STATUS_TRANSACTION_STR[newState]}`
    
    await sNotification.addNotification(UserId, text, 12)
    
}

async function checkTransactionIsCompleted(transactionId, transaction) {
        const objTransaction = await models.Transaction.findOne({
            where: {
                id: transactionId,
            },
            include: [
                {
                    model: models.Activity,
                    through: {
                        where: { status: {[Op.ne]: 'A'} }
                    }
                },{
                    model: models.Requirement,
                    through: {
                        where: { status: {[Op.ne]: 'A'} }
                    }
                }
            ],
            transaction
        })
        
        const transactionCompleted = !(objTransaction.Requirements.length + objTransaction.Activities.length)
        
        if(transactionCompleted){ //transactions is completed, because all its activities and requirements is approved 
            const newStatusTransaction = C.TRANSACTION_COMPLETED
            const invalidStates = [] //all status is valid
            await updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)
        }
}

function trowExceptionStatusTransaction(status){
    throwException(C.MESSAGES_BY_TRANSACTION_STATUS[status])
}

async function reserveTransaction(transactionId){
    await models.sequelize.transaction(async transaction=>{
        let objTransaction = await getTransactionById(transactionId);
        const newStatusTransaction = C.TRANSACTION_RESERVED
        const invalidStates = C.STATUS_TRANSACTION_WITHOUT(C.TRANSACTION_COMPLETED) //Only transactions completed 
        await updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)
        
        const propertyId = objTransaction.Request.Property.id
        const newStatusProperty = C.PROPERTY_RESERVED;
        const invalidStates2 = C.STATUS_PROPERTY_WITHOUT(C.PROPERTY_PUBLISHED) //Only properties publishied         
        await sProperty.updateStatus(propertyId, newStatusProperty, invalidStates2, transaction)
    })
}

async function removeReservationTransaction(transactionId){
    await models.sequelize.transaction(async transaction=>{
        let objTransaction = await getTransactionById(transactionId);
        const newStatusTransaction = C.TRANSACTION_COMPLETED
        const invalidStates = C.STATUS_TRANSACTION_WITHOUT(C.TRANSACTION_RESERVED) //Only transactions reserved 
        await updateStatus(transactionId, newStatusTransaction, invalidStates, transaction)
        
        const propertyId = objTransaction.Request.Property.id
        const newStatusProperty = C.PROPERTY_PUBLISHED;
        const invalidStates2 = C.STATUS_PROPERTY_WITHOUT(C.PROPERTY_RESERVED) //Only properties reserved         
        await sProperty.updateStatus(propertyId, newStatusProperty, invalidStates2, transaction)
    })
}

async function getCountTransactionsByUserId(userId) {
    await sUser.getUserById(userId);
    const count = await models.Transaction.count({ 
        where: {
            [Op.or]: [
              { '$Request.Client.UserId$': userId },
              { '$Request.Employee.UserId$': userId }
            ] 
        },
        include: [
        {
            model: models.Request,
            include: [{
                model: models.Client
            },{
                model: models.Employee
            }]
        }]
    })
    return count;
}



module.exports = {
  addTransaction,
  getTransactionsAll,
  getTransactionById,
  getAllTransactionsEmployee,
  getAllServicesForTransactionsEmployee,
  getAllTransactionsClient,
  approveRequirementByTransactionId,
  rejectRequirementByTransactionId,
  uploadRequirementByTransactionId,
  approveActivityByTransactionId,
  rejectActivityByTransactionId,
  updateStatus,
  getTransactionsAllByUserId,
  checkTransactionIsCompleted,
  reserveTransaction,
  removeReservationTransaction,
  getCountTransactionsByUserId
}