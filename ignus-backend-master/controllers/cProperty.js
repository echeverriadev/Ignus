const sProperty = require("../services/sProperty"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
const { getFirstPropertyOfObject } = require("../global/helpers");
const sTypeSpecification = require("../services/sTypeSpecification");

async function getPropertiesAll(req,res) {
	try{
		let properties = await sProperty.getPropertysAll();
		let new_properties = await helperTypeSpecifications(properties);
		properties = new_properties;
		//res.status(200).json(properties);
		makeResponseOk(res, {properties}, "property/listProperty");
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getProperty(req,res) {
	try{
		let id = req.params.id;
		let property = await sProperty.getProperty(id)
		let new_property = property.toJSON();
		let typeSpec = await sTypeSpecification.getTypeSpecificationWithOneProperty(new_property.id);
		new_property.TypeSpecifications = typeSpec;
		property = new_property;
		makeResponseOk(res, {property}, "property/getProperty");
	}catch(err){
		makeResponseException(res,err)
	}
}


async function getCatalogue(req, res) {
	try{
		let query = req.query;
		let properties = await sProperty.getPropertysCatalogueAll(query);
		let new_properties = await helperTypeSpecifications(properties);
		properties = new_properties;
		makeResponseOk(res, {properties}, "property/catalogue")
	}catch(err){
		makeResponseException(res,err);
	}
}

async function addPendingProperty(req, res) {
	try {
		let body = JSON.parse(getFirstPropertyOfObject(req.fields));
		const image = getFirstPropertyOfObject(req.files);
		await sProperty.addPendingProperty(body, image);
		makeResponseOkMessage(res,'I082');
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function addTransaction(req, res) {
	try {
		let id = req.params.id;
		let TransactionId = req.fields.TransactionId;
		await sProperty.addTransaction(id, TransactionId);
		makeResponseOkMessage(res,'I084');
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function postPublication(req, res) {
	try {
		let id = req.params.transactionId;
		let body = JSON.parse(getFirstPropertyOfObject(req.fields));
		const image = getFirstPropertyOfObject(req.files);
		
		await sProperty.createPublication(body, image, id);
		makeResponseOkMessage(res,'I120');
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function updateProperty(req,res) {
	try{
		let body = req.fields
		let id = req.params.id
		await sProperty.updateProperty(id, body);
		makeResponseOkMessage(res,'I088');
	}catch(err){
		makeResponseException(res,err)
	}
}

async function helperTypeSpecifications(properties = []) {
	// get the types specifications from properties
	let new_properties = [];
	for(let i=0; i<properties.length; i++) {
		new_properties.push(properties[i].toJSON());
		let typeSpec = await sTypeSpecification.getTypeSpecificationWithOneProperty(properties[i].id);
		new_properties[i].TypeSpecifications = typeSpec;
	}
	return new_properties;
}

async function matchTwoProperties(req,res) {
	try{
		const {published,desired} = req.query
		let match = await sProperty.matchTwoProperties(published,desired);
		res.status(200).json({match})
		//makeResponseOk(res, {properties}, "property/catalogue")
	}catch(err){
		makeResponseException(res,err);
	}
}

async function getPropertyDesiredPreferencesClient(req,res) {
	try{
		let userId = req.params.userId;
		let property = await sProperty.getPropertyDesiredPreferencesClient(userId)
		let new_property = property.toJSON();
		let typeSpec = await sTypeSpecification.getTypeSpecificationWithOneProperty(new_property.id);
		new_property.TypeSpecifications = typeSpec;
		property = new_property;
		makeResponseOk(res, {property}, "property/getProperty");
	}catch(err){
		makeResponseException(res,err)
	}
}



module.exports = {
	getPropertiesAll,
	getProperty,
	getCatalogue,
	addPendingProperty,
	addTransaction,
	postPublication,
	updateProperty,
	matchTwoProperties,
	getPropertyDesiredPreferencesClient
}