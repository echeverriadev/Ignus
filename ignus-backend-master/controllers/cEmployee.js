const models = require("../models"),
  sEmployee = require("../services/sEmployee"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

const { ALL_STATUS_TRANSACTION } = require("../config/properties/constants")


async function getEmployeeAll(req,res) {
  try {
    const employees = await sEmployee.getEmployeeAll();
    //res.status(200).json(employees)
    makeResponseOk(res, {employees}, "employee/listEmployees")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getEmployee(req, res) {
  try {
    const id = req.params.id;
    const employee = await sEmployee.getEmployee(id);
    makeResponseOk(res, {employee}, "employee/getEmployee");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateEmployee(req, res) {
  const { fields } = req;
  try {
    await sEmployee.updateEmployee(req.params.user_id, fields);

    makeResponseOkMessage(res, "I002");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyEmployee(req, res) {
  try {
    await sEmployee.destroyEmployee(req.params.user_id);
    makeResponseOkMessage(res, "I004")
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllTransactionsEmployee(req,res) {
  try {
    let status = ALL_STATUS_TRANSACTION
		if(req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
    const userId = req.params.userId
    const transactions = await sEmployee.getAllTransactionsEmployee(userId, status)
    makeResponseOk(res, {transactions}, "transaction/listTransaction")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getCountClientsByEmployee(req,res) {
	try {
		let employeeId = req.params.employeeId;
		let count = await sEmployee.getCountClientsByEmployee(employeeId);
		//res.status(200).json(count)
		makeResponseOk(res, {data: count}, "global/count");
	} catch(err){
		makeResponseException(res,err);
	}
}



module.exports = {
  getEmployeeAll,
  getEmployee,
  updateEmployee,
  destroyEmployee,
  getAllTransactionsEmployee,
  getCountClientsByEmployee
}