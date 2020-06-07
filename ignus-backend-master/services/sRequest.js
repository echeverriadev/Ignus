const models = require("../models");
const sTransaction = require("./sTransaction");
const { throwException, Op } = require("../global/helpers");
const sNotification = require("./sNotification")
const sTypeService = require("./sTypeService")
const C = require("../config/properties/constants")
const sUser = require("./sUser");

//deprecated
async function getRequestsPendingAll() {
	const requests = await models.Request.findAll({
		where: { status: 'S' },
		include: [{
			model: models.TypeRequest,
		}, {
			model: models.TypeService,
		}, {
			model: models.Client,
		}, {
			model: models.Employee,
		}],
		order: [
			['id', 'asc'],
			[models.TypeRequest, 'id', 'asc'],
			[models.TypeService, 'id', 'asc'],
			[models.Client, 'id', 'asc'],
			[models.Employee, 'id', 'asc'],
		]
	})
	if (!requests || !requests.length)
		throwException('E067')
	return requests
}

async function getRequestsAll(status, userId) {
	const where = buildQuery(status, userId);
	const requests = await models.Request.findAll({
		where,
		include: [{
			model: models.TypeRequest,
		}, {
			model: models.TypeService,
		}, {
			model: models.Client,
		}, {
			model: models.Employee,
		},{
			model: models.Property,
			include: [
				{
		        model: models.Parish,
		        include: [{
		          model: models.Municipality,
		          include: [{
		            model: models.State
		          }]
		        }]
		      },{
		      	model: models.TypeProperty
		      }
			]
		},],
		order: [
			['id', 'asc'],
			[models.TypeRequest, 'id', 'asc'],
			[models.TypeService, 'id', 'asc'],
			[models.Client, 'id', 'asc'],
			[models.Employee, 'id', 'asc'],
		]
	})

	if (!requests || !requests.length)
		throwException('E067')
	return requests
}

async function getRequestById(requestId) {
	const requests = await models.Request.findOne({
		where: {id: requestId},
		include: [{
			model: models.TypeRequest,
		}, {
			model: models.TypeService,
		}, {
			model: models.Client,
		}, {
			model: models.Employee,
		}, {
			model: models.Property,
			include: [
				{
		        model: models.Parish,
		        include: [{
		          model: models.Municipality,
		          include: [{
		            model: models.State
		          }]
		        }]
		      },{
		      	model: models.TypeProperty
		      }
			]
		},],
		order: [
			['id', 'asc'],
			[models.TypeRequest, 'id', 'asc'],
			[models.TypeService, 'id', 'asc'],
			[models.Client, 'id', 'asc'],
			[models.Employee, 'id', 'asc'],
		]
	})

	if (!requests)
		throwException('E067')
	return requests
}

function buildQuery(status, userId) {
	let where = {};
	if (status) {
		where.status = {
			[Op.in]: status }
	}
	if (userId) {
		where[Op.or] = [
			{ '$Client.UserId$': userId },
			{ '$Employee.UserId$': userId }
		]
	}
	return where;
}

async function approveRequest(requestId) {
	await models.sequelize.transaction(async transaction => {
		let request = await getRequest(requestId, 'S')
		let typeService = await request.getTypeService({ transaction })
		await sTransaction.addTransaction(requestId, typeService, transaction)
		let appointment = await request.getAppointments({where: {status: 'S'}, transaction})
		await appointment[0].update({ status: 'C' },{ transaction })
		await request.update({ status: 'A' }, { transaction })
		const UserId = request.Client.UserId;
		const text = `Solicitud de ${typeService.name} de fecha ${request.wishDate}`
		await sNotification.addNotification(UserId, text, 5)
		
	});
}

async function getRequest(id, status) {
	let request = await models.Request.findOne({
		where: { id, status },
		include: [{ model: models.Client }]
	})
	if (!request)
		throwException('E025')
	return request;
}

async function getRequestByIdSimplified(id) {
	let request = await models.Request.findOne({ where: { id } })
	if (!request)
		throwException('E025')
	return request;
}

async function addRequestPending(data) {
	await models.sequelize.transaction(async transaction => {
		let typeService = await sTypeService.getTypeService(data.TypeServiceId, { transaction });

		if (!data.PropertyId) {
			let newProperty = {
				ClientId: data.ClientId,
				TypePropertyId: data.TypePropertyId,
				ParishId: data.ParishId,
				buildDate: data.buildDate,
				ubication: data.ubication,
				status: typeService.offeringProperty ? C.PROPERTY_DESIRED : C.PROPERTY_INITIAL
			}
			let property = await models.Property.create(newProperty, { transaction })
			data.PropertyId = property.id
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
		}

		let request = await models.Request.create(data, { transaction })

		let newAppointment = {
			dateAppointment: data.wishDate,
			RequestId: request.id,
			turn: data.turn,
			TypeAppointmentId: 1,
			reason: "Cita inicial para la solicitud de servicio."
		}

		await models.Appointment.create(newAppointment, {transaction});
		
		let employee = await models.Employee.findOne({ where:{id: data.EmployeeId} }, {transaction})
		let client = await models.Client.findOne({ where:{id: data.ClientId} },{transaction})
		let text = `${typeService.name} de ${client.firstName} ${client.lastName} para el ${data.wishDate}`
		await sNotification.addNotification(employee.UserId, text, 9, transaction)
	});

}

async function updateRequest(id, data) {
	let requestOld = await getRequest(id)
	await requestOld.update(data);
}

async function deleteRequest(id) {
	let requestOld = await getRequest(id)
	await requestOld.update({ status: 'E' });
}

async function getTransactionByRequestId(RequestId) {
	let request = await getRequestByIdSimplified(RequestId);
	let transaction = await request.getTransaction({
		include: [{
				model: models.TypeServiceActivity,
				include: [{ model: models.Activity }]
			},
			{
				model: models.TypeServiceRequirement,
				include: [{ model: models.Requirement }]
			},
			{
				model: models.Request,
				include: [{
					model: models.TypeRequest,
				}, {
					model: models.TypeService,
				}, {
					model: models.Client,
				}, {
					model: models.Employee,
				}],
			}
		]
	});
	if (!transaction)
		throwException('E031')
	return transaction;
}


async function getCountRequestsByUserId(userId) {
    await sUser.getUserById(userId);
    const count = await models.Request.count({ 
    	where: { 
    		[Op.or]: [
		    	{ '$Client.UserId$': userId },
				{ '$Employee.UserId$': userId }
		    ]
    	},
    	include: [
    		{model: models.Client},
    		{model: models.Employee}
		]
    })
    return count;
}

async function rejectRequest(requestId) {
	await models.sequelize.transaction(async transaction => {
		let request = await getRequest(requestId, 'S')
		let typeService = await request.getTypeService({ transaction })
		let appointment = await request.getAppointments({where: {status: 'S'}, transaction})
		await appointment[0].update({ status: 'D' },{ transaction })
		await request.update({ status: 'R' }, { transaction })
		const UserId = request.Client.UserId;
		const text = `Solicitud de ${typeService.name} de fecha ${request.wishDate}`
		await sNotification.addNotification(UserId, text, 6)
	});
	
}

module.exports = {
	approveRequest,
	getRequestsPendingAll,
	addRequestPending,
	updateRequest,
	getRequest,
	deleteRequest,
	getTransactionByRequestId,
	getRequestByIdSimplified,
	getRequestsAll,
	getCountRequestsByUserId,
	rejectRequest,
	getRequestById
}
