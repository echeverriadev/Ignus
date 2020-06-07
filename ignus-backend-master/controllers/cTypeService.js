const sTypeService = require("../services/sTypeService"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
	const { getFirstPropertyOfObject } = require("../global/helpers")

async function getTypeServicesAll(req,res) {
	try{
		let offeringProperty = req.query.offeringProperty
		let typeServices = await sTypeService.getTypeServiceAll(offeringProperty)
		makeResponseOk(res, {typeServices}, "typeService/listTypeServices")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getTypeService(req,res) {
	try{
		let id = req.params.id;
		let typeService = await sTypeService.getTypeService(id)
		makeResponseOk(res, {typeService}, "typeService/getTypeService")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getRequirementForTypeService(req,res) {
	try{
		let id = req.params.id;
		let requirements = await sTypeService.getRequirementForTypeService(id)
		makeResponseOk(res, {data:requirements}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getActivitiesForTypeService(req,res) {
	try{
		let id = req.params.id;
		let activities = await sTypeService.getActivitiesForTypeService(id)
		makeResponseOk(res, {data:activities}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addTypeService(req,res) {
	try{
		//let data = req.fields
        let data = JSON.parse(getFirstPropertyOfObject(req.fields))
        console.log(data)
        
        //req.files.someNameUsedInRequest so with this function I don't care that someName...
        const image = getFirstPropertyOfObject(req.files) 
		await sTypeService.addTypeService(data,image)
		makeResponseOkMessage(res,'I027')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateTypeService(req,res) {
	try{
        let data = JSON.parse(getFirstPropertyOfObject(req.fields))
        console.log(data)
        
        //req.files.someNameUsedInRequest so with this function I don't care that someName...
        const image = getFirstPropertyOfObject(req.files)
		let id = req.params.id;
		await sTypeService.updateTypeService(id, data, image)
		makeResponseOkMessage(res,'I029')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteTypeService(req,res) {
	try{
		let id = req.params.id;
		await sTypeService.deleteTypeService(id)
		makeResponseOkMessage(res,'I031')
	}catch(err){
		makeResponseException(res,err)
	}
}


module.exports = {
	getTypeServicesAll,
	getRequirementForTypeService,
	getActivitiesForTypeService,
	getTypeService,
	addTypeService,
	updateTypeService,
	deleteTypeService
}