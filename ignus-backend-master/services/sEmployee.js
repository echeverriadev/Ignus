const models = require("../models");
const {throwException, getWorkingDays, Op} = require("../global/helpers");
const sTransaction = require("./sTransaction");
const sUser = require("./sUser");

async function updateEmployee(user_id, data) {
  await models.sequelize.transaction(async transaction=>{
    const Employee = await models.Employee.findOne({
      where: { UserId: user_id },
      include:[{ model: models.User }, { model: models.Day }]
    });

    if(!Employee) {
      throwException('E001')
    }
  
    if (data.days) {
      const jsonDays = await getWorkingDays(data.days);
      await Employee.Day.update(jsonDays, {transaction}); 
    }

    if (data.roles) {
      await Employee.User.setRoles(data.roles,{transaction})
    }

    await Employee.update(data,{transaction});
  });
  
}

async function destroyEmployee(user_id) {
  const Employee = await models.Employee.findOne({ where: { UserId: user_id }});

  if(!Employee) {
    throwException('E001')
  }

  return await Employee.update({status: "E"});
}

async function getEmployee(employee_id) {
  const employee = await models.Employee.findOne({
    where: { id: employee_id, status: "A" },
    include: [
    {
      model: models.User, include: [{ model: models.Role }]
    },
    ],
    order: [
      ['id','asc'],
      [models.User,'id','asc']
    ]
  });
  if(!employee) {
    throwException("E001");
  }
  return employee;
}

async function getEmployeeByUserId(UserId) {
  const employee = await models.Employee.findOne({
    where: { UserId, status: "A" }});
  if(!employee) {
    throwException("E001");
  }
  return employee;
}

async function getEmployeeByUserIdWithoutException(UserId) {
  const employee = await models.Employee.findOne({
    where: { UserId, status: "A" },
    include: [{model: models.Day}]
  });
  return employee;
}

async function getEmployeeAll() {
  return await models.Employee.findAll({ 
    where: { status: "A" },
    include: [
      {
        model: models.User, include: [{ model: models.Role }]
      },{
        model: models.Day
      },
      ],
      order: [
        ['id','asc'],
        [models.User,'id','asc']
      ]
  });
}

async function getAllTransactionsEmployee(UserId, status) {
  let employee = await getEmployeeByUserId(UserId);
  let transactions = await sTransaction.getAllTransactionsEmployee(employee.id, status)
  return transactions;
}

async function getCountClientsByEmployee(employeeId) {
    const result = await models.sequelize.query(`SELECT count(distinct "Request"."ClientId")
                            FROM "Requests" AS "Request" 
                            WHERE "Request"."status" = 'A' AND "Request"."EmployeeId" = ?`,
      { replacements: [employeeId], type: models.sequelize.QueryTypes.SELECT })
    
    return parseInt(result[0].count)
}

module.exports = {
  updateEmployee,
  destroyEmployee,
  getEmployee,
  getEmployeeAll,
  getAllTransactionsEmployee,
  getWorkingDays,
  getEmployeeByUserIdWithoutException,
  getCountClientsByEmployee
}