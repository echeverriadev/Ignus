const sContract = require("../services/sContract"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
const { getFirstPropertyOfObject } = require("../global/helpers")

async function getAllContracts(req, res) {
  try {
		const contracts = await sContract.getContractAll();
    makeResponseOk(res, {contracts}, "contract/listContract");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getContract(req,res) {
	try {
		let id = req.params.id;
		let contract = await sContract.getContract(id);
		makeResponseOk(res, {contract}, "contract/getContract");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function getWarrantiesForContract(req,res) {
	try{
		let id = req.params.id;
		let warranties = await sContract.getWarrantyForContract(id);
		makeResponseOk(res, {data:warranties}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}
 
async function addContract(req,res) {
	try {
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		const document = getFirstPropertyOfObject(req.files);
		await sContract.createContract(data, document);
		makeResponseOkMessage(res,'I024');
	} catch(err) {
		makeResponseException(res,err)
	}
}

async function updateContract(req,res) {
	try {
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		const document = getFirstPropertyOfObject(req.files);
		let id = req.params.id;
		await sContract.updateContract(id, data, document);
		makeResponseOkMessage(res,'I026')
	} catch(err){
		makeResponseException(res,err)
	}
}

async function deleteContract(req,res) {
	try{
		let id = req.params.id;
		await sContract.destroyContract(id);
		makeResponseOkMessage(res,'I028')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
  getAllContracts,
  getContract,
  getWarrantiesForContract,
  addContract,
  updateContract,
  deleteContract
}