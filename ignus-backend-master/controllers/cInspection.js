const sInspection = require("../services/sInspection"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");

const { getFirstPropertyOfObject } = require("../global/helpers")


async function getInspections(req,res) {
	try{
		let inspections = await sInspection.getInspectionsAll()
		makeResponseOk(res, {inspections}, "inspection/listInspection")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addInspection(req,res) {
	try{
		let data = JSON.parse(getFirstPropertyOfObject(req.fields))
        //req.files.someNameUsedInRequest so with this function I don't care that someName...
        const document = getFirstPropertyOfObject(req.files)
        console.log(data)
		await sInspection.addInspection(data, document)
		makeResponseOkMessage(res,'I067')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateInspection(req,res) {
	try{
		let data = JSON.parse(getFirstPropertyOfObject(req.fields))
        //req.files.someNameUsedInRequest so with this function I don't care that someName...
        const document = getFirstPropertyOfObject(req.files)
		let id = req.params.id
		await sInspection.updateInspection(id,data,document)
		makeResponseOkMessage(res,'I069')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteInspection(req,res) {
	try{
		let id = req.params.id
		await sInspection.deleteInspection(id)
		makeResponseOkMessage(res,'I071')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getInspections,
	addInspection,
	updateInspection,
	deleteInspection
}