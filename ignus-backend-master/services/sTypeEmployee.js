const models = require("../models");
const {throwException} = require("../global/helpers");

async function getTypeEmployee(type_emp_id) {
  const typeEmployee = models.TypeEmployee.findByPk(type_emp_id);
  if(!typeEmployee) {
    throwException("E003");
  }
  return await typeEmployee;
}

async function getAllTypeEmployee() {
  return await models.TypeEmployee.findAll();
}

async function createTypeEmployee(data) {
  return await models.TypeEmployee.create(data);
}

async function updateTypeEmployee(type_emp_id, data) {
  const typeEmployee = await models.TypeEmployee.findByPk(type_emp_id);
  if(!typeEmployee) {
    throwException("E003");
  }
  return await typeEmployee.update(data);
}

async function destroyTypeEmployee(type_emp_id) {
  const typeEmployee = await models.TypeEmployee.findByPk(type_emp_id);
  if(!typeEmployee) {
    throwException("E003");
  }
  return await typeEmployee.destroy();
}

module.exports = {
  getTypeEmployee,
  getAllTypeEmployee,
  createTypeEmployee,
  updateTypeEmployee,
  destroyTypeEmployee
}