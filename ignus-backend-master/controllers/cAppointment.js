const sAppointment = require("../services/sAppointment"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
	
const sEmployee = require("../services/sEmployee");

async function getAppointmentsAll(req,res) {
	try{
		let appointments = await sAppointment.getAppointmentAll();
		makeResponseOk(res, {appointments}, "appointment/listAppointment")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getAppointment(req,res) {
	try{
		let id = req.params.id;
		let appointment = await sAppointment.getAppointment(id)
		makeResponseOk(res, {appointment}, "appointment/getAppointment")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addAppointment(req, res) {
  try {
    let data = req.fields;
    await sAppointment.addAppointment(data);
    makeResponseOkMessage(res, 'I076');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function updateAppointment(req, res) {
  try {
    let id = req.params.id;
    let data = req.fields;
    await sAppointment.updateAppointment(id, data);
    makeResponseOkMessage(res, 'I078');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function deleteAppointment(req, res) {
  try {
    let id = req.params.id;
    await sAppointment.deleteAppointment(id);
    makeResponseOkMessage(res, 'I080');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function getScheduleByUserId(req,res) {
	try{
	  let userId = req.query.userId;
		let appointments = await sAppointment.getScheduleByUserId(userId);
		let employee = await sEmployee.getEmployeeByUserIdWithoutException(userId)
		let schedule = {appointments, excludeDays: []}
		if(employee)
		  schedule.excludeDays = employee.Day.arrayFreeDays;
		//res.status(200).json(schedule)
		makeResponseOk(res, {schedule}, "appointment/schedule")
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getAppointmentsAll,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getScheduleByUserId
}