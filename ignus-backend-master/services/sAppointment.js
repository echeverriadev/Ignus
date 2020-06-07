const models = require("../models");
const { throwException, Op } = require("../global/helpers");
const helper = require("../global/helpers");

async function getAppointmentAll() {
  let Appointments = await models.Appointment.findAll({
    where: { status: {
        [Op.ne]: 'D' }, },
    include: [{
      model: models.Request,
      include: [
        { model: models.Client, include: models.User },
        { model: models.Employee },
        { model: models.TypeRequest },
      ],
    }, {
      model: models.TypeAppointment
    }],
    order: [
      ['id', 'asc']
    ]
  })
  if (!Appointments || !Appointments.length)
    throwException('E034')
  return Appointments
}

async function getAppointment(id) {
  let Appointment = await models.Appointment.findOne({
    where: { id, status: {
        [Op.ne]: 'D' } },
    include: [{
      model: models.Request,
      include: [
        { model: models.Client, include: models.User },
        { model: models.Employee },
        { model: models.TypeRequest },
      ],
    }, {
      model: models.TypeAppointment
    }],
    order: [
      ['id', 'asc']
    ]
  })
  if (!Appointment)
    throwException('E034')

  return Appointment
}

async function addAppointment(data) {
  await models.sequelize.transaction(async transaction => {
    await models.Appointment.create(data, { transaction });
  });
}

async function updateAppointment(id, data) {
  await models.sequelize.transaction(async transaction => {
    let Appointment = await getAppointment(id);
    await Appointment.update(data, { transaction })
  });
}

async function deleteAppointment(id) {
  let Appointment = await getAppointment(id);
  Appointment.update({ status: 'D' })
}

async function updateStatusOldAppointments() {
  console.log(helper.getCurrentDate())
  await models.Appointment.update({ status: 'E' }, {
    where: {
      status: 'C',
      dateAppointment: {
        [Op.lte]: helper.getCurrentDate()
      }
    }
  })
}




async function getScheduleByUserId(userId) {
  
  await updateStatusOldAppointments()
  
  let Appointments = await models.Appointment.findAll({
    where: {
      status: {
        [Op.ne]: 'D' },
      [Op.or]: [
        { '$Request.Client.UserId$': userId },
        { '$Request.Employee.UserId$': userId }
      ]
    },
    include: [{
      model: models.Request,
      include: [
        { model: models.Client, include: models.User },
        { model: models.Employee },
        { model: models.TypeRequest },
        { model: models.TypeService }
      ],
    }, {
      model: models.TypeAppointment
    }],
    order: [
      ['dateAppointment', 'desc']
    ]
  })

  if (!Appointments || !Appointments.length)
    throwException('E034')

  

  return Appointments
}

module.exports = {
  getAppointmentAll,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getScheduleByUserId
}
