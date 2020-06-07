const sMunicipality = require("../services/sMunicipality"),
	{makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");

async function getParishForMunicipality(req,res) {
	try{
	    let id = req.params.id
		let municipalities = await sMunicipality.getParishForMunicipality(id)
		makeResponseOk(res, {data:municipalities}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
	getParishForMunicipality
}