const models = require("../models");
const {throwException, Op} = require("../global/helpers");
const mailer = require('../global/mailer');

async function getContactAll(query) {
  const where = buildQuery(query);

  let Contacts = await models.Contact.findAll({
    where,
    include: [
      { model: models.TypeContact },
      { model: models.Subject },
      { model: models.User, include: [{ model: models.Client }] }
    ],
    order: [
      ['contactDate','desc']
    ]
  })
  if(!Contacts || !Contacts.length)
    throwException('E024')
  return Contacts
}

async function getContact(id) {
  let Contact = await models.Contact.findOne({
    where: { status: { [Op.ne]: 'B' }, id  },
    include: [
      { model: models.TypeContact },
      { model: models.Subject },
      { model: models.User, include: [{ model: models.Client }] }
    ],
  })
  if(!Contact)
    throwException('E024')
    
  return Contact
}

function buildQuery(query) {
  let where = {};

  if (query.userId) { where.UserId = query.userId; }
  if (query.status) { 
    where.status = query.status; 
  } else {
    where.status = { [Op.ne]: 'B' }
  }

  return where;
}

async function addContact(data) {
  await models.sequelize.transaction(async transaction=>{
    if (!data.hasOwnProperty("UserId"))
      data.guestEmail = data.email;
    
    await models.Contact.create(data,{transaction});
  });
}

async function updateContact(id,data) {
  await models.sequelize.transaction(async transaction=>{
    let Contact = await getContact(id);
    await Contact.update(data,{transaction})
  });
}

async function deleteContact(id) {
  let Contact = await getContact(id);
  Contact.update({status:'B'})
}

async function respondContact(id, message) {
  const contact = await getContact(id);
	const email = contact.guestEmail ? contact.guestEmail : contact.User.username;
	const emailData = { email: email, message: message }
	// Send email with message
	mailer.sendContactRespond(emailData);
	await contact.update({
	  status: 'A'
	})
}

module.exports = {
  getContactAll,
  getContact,
  addContact,
  updateContact,
  deleteContact,
  respondContact
}