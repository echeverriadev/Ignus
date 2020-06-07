const sState = require("../services/sState"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getStates(req,res) {
	try{
		let states = await sState.getStatesAll()
		makeResponseOk(res, {data:states}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getCityForState(req,res) {
	try{
	    let id = req.params.id
		let cities = await sState.getCityForState(id)
		makeResponseOk(res, {data:cities}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getMunicipalityForState(req,res) {
	try{
	    let id = req.params.id
		let municipalities = await sState.getMunicipalityForState(id)
		makeResponseOk(res, {data:municipalities}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getStates,
	getCityForState,
	getMunicipalityForState
}