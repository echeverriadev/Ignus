const sTyeEmployee = require("../services/sTypeEmployee"),
	{ makeResponseOk, makeResponseException } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getAllTypesEmployee(req, res) {
  try {
    const typeEmployees = await sTyeEmployee.getAllTypeEmployee();
    makeResponseOk(res, {data: typeEmployees}, "global/master")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getAllTypesEmployee
}