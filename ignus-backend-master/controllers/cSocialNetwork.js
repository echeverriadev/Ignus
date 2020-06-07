const sSocialNetwork = require("../services/sSocialNetwork"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");


async function getSocialNetworks(req,res) {
	try{
		let socialNetworks = await sSocialNetwork.getSocialNetworksAll()
		makeResponseOk(res, {data:socialNetworks}, "socialNetwork/listSocialNetworks")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addSocialNetwork(req,res) {
	try{
		let body = req.fields;
		await sSocialNetwork.addSocialNetwork(body)
		makeResponseOkMessage(res,'I021')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function updateSocialNetwork(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sSocialNetwork.updateSocialNetwork(id,body)
		makeResponseOkMessage(res,'I023')
	}catch(err){
		makeResponseException(res,err)
	}
}

async function deleteSocialNetwork(req,res) {
	try{
		let id = req.params.id
		await sSocialNetwork.deleteSocialNetwork(id)
		makeResponseOkMessage(res,'I025')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getSocialNetworks,
	addSocialNetwork,
	updateSocialNetwork,
	deleteSocialNetwork
}