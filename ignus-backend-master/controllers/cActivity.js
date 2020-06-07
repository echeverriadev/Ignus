const sActivity = require("../services/sActivity"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getActivities(req,res) {
	try{
		let activities = await sActivity.getActivitiesAll()
		makeResponseOk(res, {data:activities}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addActivity(req,res) {
	try{
		let body = req.fields;
		await sActivity.addActivity(body)
		makeResponseOkMessage(res,'I015')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateActivity(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sActivity.updateActivity(id,body)
		makeResponseOkMessage(res,'I017')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteActivity(req,res) {
	try{
		let id = req.params.id
		await sActivity.deleteActivity(id)
		makeResponseOkMessage(res,'I019')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getActivities,
	addActivity,
	updateActivity,
	deleteActivity
}