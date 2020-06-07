const sAgency = require("../services/sAgency"),
    {makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
const { getFirstPropertyOfObject } = require("../global/helpers")
const { TABLES, COLUMNS } = require("../config/properties/constants");



async function getSocialNetworkForAgency(req,res) {
	try{
		let socialNetworks = await sAgency.getSocialNetworkForAgency()
		makeResponseOk(res, {data:socialNetworks}, "socialNetwork/listSocialNetworks")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getLogoForAgency(req,res) {
	try{
		let logo = await sAgency.getLogoForAgency()
		makeResponseOk(res, {data:logo}, "image/getImage")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getAgency(req, res) {
    try{
        let agency = await sAgency.getAgency()
        makeResponseOk(res,{agency},'agency/getAgency')
    }catch(e){
        console.log(e);
        makeResponseException(res,e)
    }
    
}

async function addAgency(req, res) {
    try{
        await sAgency.createAgency(req.fields)
        makeResponseOkMessage(res,'I009')
    }catch(e){
        console.log(e);
        makeResponseException(res,e)
    }
}

async function updateAgency(req, res) {
    try{
        //let body = req.fields
        let body = JSON.parse(getFirstPropertyOfObject(req.fields))
        
        //req.files.someNameUsedInRequest so with this function I don't care that someName...
        const logo = getFirstPropertyOfObject(req.files) 
        await sAgency.updateAgency(body,logo)
        makeResponseOkMessage(res,'I011')
    }catch(e){
        console.log(e);
        makeResponseException(res,e)
    }
}

async function getTables(req, res) {
    try {
        let tables = TABLES;
        makeResponseOk(res,{data: tables},'global/table')
    } catch(e){
        console.log(e);
        makeResponseException(res,e)
    }
}

async function getAttributes(req, res) {
    try {
        let tableId = req.params.id;
        let index = COLUMNS.findIndex(function(x) { return x.table == tableId });
        let columns = [];
        
        if (index != -1) {
            columns = COLUMNS[index].attrib;
        }
        makeResponseOk(res,{data: columns},'global/table')
    } catch(e){
        console.log(e);
        makeResponseException(res,e)
    }
}

module.exports = {
    getAgency,
    updateAgency,
    addAgency,
    getSocialNetworkForAgency,
    getLogoForAgency,
    getTables,
    getAttributes
}
