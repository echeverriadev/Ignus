const sPromotion = require("../services/sPromotion"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
	const { getFirstPropertyOfObject } = require("../global/helpers");
	secret_key = require("../config").secret_key;

async function getAllPromotions(req, res) {
  try {
		let status = ['G'];
		if (req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
		const promotions = await sPromotion.getPromotionAll(status);
		
		if (status == 'G')
			makeResponseOk(res, {promotions}, "promotion/listPromotions");
		else {
			// for set bin_status
			for(var i = 0; i < promotions.length; i++) {
				promotions[i].bin_status = promotions[i].status == 'A' ? true : false;
			}
			makeResponseOk(res, {promotions}, "promotion/listActivePromotion");	
		}
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getPromotion(req,res) {
	try {
		let id = req.params.id;
		let status = ['G'];
		if (req.query.hasOwnProperty('status') && req.query.status.length)
			status = req.query.status.split(',');
		let promotion = await sPromotion.getPromotion(id,status);

		if (status == 'G')
			makeResponseOk(res, {promotion}, "promotion/getPromotion");
		else {
			// for set bin_status
			promotion.bin_status = promotion.status == 'A' ? true : false;
			makeResponseOk(res, {promotion}, "promotion/getActivePromotion");
		}
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createPromotion(req, res) {
  try {
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		console.log("DATA: ", data);
		const image = getFirstPropertyOfObject(req.files);

    await sPromotion.addPromotion(data,image);
    makeResponseOkMessage(res, "I042");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updatePromotion(req,res) {
	try{
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		const image = getFirstPropertyOfObject(req.files);
		let id = req.params.id;

		await sPromotion.updatePromotion(id, data, image);
		makeResponseOkMessage(res,'I044');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function activatePromotion(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sPromotion.activatePromotion(id, data);
		makeResponseOkMessage(res,'I044');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function addPropertiesToPromotion(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sPromotion.addProperties(id, data);
		//await sPromotion.updatePromotion(id, { status: 'A' });
		makeResponseOkMessage(res,'I044');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function addSpecificationToPromotion(req,res) {
	try{
		let data = req.fields;
		let id = req.params.id;
		await sPromotion.addEspecification(id, data);
		//await sPromotion.updatePromotion(id, { status: 'A' });
		makeResponseOkMessage(res,'I044');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function deletePromotion(req,res) {
	try{
		let id = req.params.id;
		await sPromotion.deletePromotion(id);
		makeResponseOkMessage(res,'I046');
	}catch(err){
		makeResponseException(res,err);
	}
}

async function removePromotion(req,res) {
	try{
		let id = req.params.id;
		await sPromotion.removePromotion(id);
		makeResponseOkMessage(res,'I090');
	}catch(err){
		makeResponseException(res,err);
	}
}

/*
async function getPropertysForPromotion(req,res) {
	try{
		let id = req.params.id;
		let properties = await sPromotion.getPropertiesForPromotion(id);
		makeResponseOk(res, {data:properties}, "global/master");
	}catch(err){
		makeResponseException(res,err)
	}
}
*/
module.exports = {
  getAllPromotions,
	getPromotion,
	createPromotion,
	addPropertiesToPromotion,
	addSpecificationToPromotion,
  updatePromotion,
	deletePromotion,
	activatePromotion,
	removePromotion
}