const models = require("../models");
const {throwException, Op, onlyUnique} = require("../global/helpers");
const { saveFile } = require("../global/fileSystem");
const sNotification = require("./sNotification");
const sClient = require("./sClient");

async function getPromotionAll(status) {
  let Promotions = await models.Promotion.findAll({
    where: { status: { [Op.in]: status } },
    include: [
      { model: models.Property, include: [
        { model: models.Client, include: [{ model: models.User }] },
        { model: models.TypeService },
        { model: models.TypeProperty },
        { model: models.Specification }
      ] },
      { model: models.Specification, include: [{ model: models.Property, include: [
          { model: models.Client, include: [{ model: models.User }] },
          { model: models.TypeService },
          { model: models.TypeProperty },
          { model: models.Specification }
        ] 
      }] }
    ],
    order: [
      ['id','asc']
    ]
  })
  
  return Promotions
}

async function getPromotion(id, status) {
  let Promotion = await models.Promotion.findOne({
    where: { status: { [Op.in]: status }, id },
    include: [
      { model: models.Property, include: [
        { model: models.Client, include: [{ model: models.User }] },
        { model: models.TypeService },
        { model: models.TypeProperty },
        { model: models.Specification }
      ] },
      { model: models.Specification, include: [{ model: models.Property, include: [
          { model: models.Client, include: [{ model: models.User }] },
          { model: models.TypeService },
          { model: models.TypeProperty },
          { model: models.Specification }
        ] 
      }] }
    ],
    order: [
      ['id','asc']
    ]
  })
  if(!Promotion)
    throwException('E020')
    
  return Promotion
}

async function addPromotion(data, image = null) {
  await models.sequelize.transaction(async transaction=>{
    let urlImage; 
    if(image)
      urlImage = saveFile(image.path,"promotion");
  
    data.urlImage = urlImage;
    await models.Promotion.create(data,{transaction});
  });
}

async function updatePromotion(id,data, image = null) {
  await models.sequelize.transaction(async transaction=>{
    if(image)
      data.urlImage = saveFile(image.path,"promotion");
    let Promotion = await models.Promotion.findByPk(id, {transaction});
    await Promotion.update(data,{transaction});
  });
}

async function activatePromotion(id, data) {
  let status;
  await models.sequelize.transaction(async transaction=>{
    let Promotion = await models.Promotion.findOne({
      where: {id}, 
      include: [
        {model: models.Specification},
        {model: models.Property, include: [{ model: models.Specification }]}
      ]
    },
    {transaction});
    if (data.activate) {
      let specIds = await getSpecificationIds(Promotion);
      // After matchmaking finalize It send notifications;
      matchmakingWithClients(specIds, Promotion.name);
      status = 'A';
    }
    else {
      status = 'I';
    }
  
    await Promotion.update({status: status},{transaction});
  });
}

async function sendNotifications(name, userIds = []) {
  const text = `Promoción ${name} aprovecha esta oportunidad`;
  let uniqIds = userIds.filter(onlyUnique);
  
  for(userId of uniqIds) {
    sNotification.addNotification(userId, text, 8);
  }
}

async function matchmakingWithClients(specIds, name="") {
  let userIds = [];
  let clients = await sClient.getClientSpecificationAll();
  
  for(var i=0; i < clients.length; i++) {
    for(var k=0; k < clients[i].Specifications.length; k++) {
      // Comparing the specifications ids of each client
      let spec = clients[i].Specifications[k];
      let index = specIds.indexOf(spec.id);
      
      if (index !== -1) {
        userIds.push(clients[i].UserId);
      }
    }
  }

  sendNotifications(name, userIds);
}

async function getSpecificationIds(promotion) {
  let specIds = []; // specifications ids

  // Getting the specification ids related with promotion
  // It can be from the properties side or directly from specifications 
  if (promotion.Specifications) {
    for(spec of promotion.Specifications) {
      specIds.push(spec.id);
    }
  } else if (promotion.Properties) {
    for(prop of promotion.Properties) {
      for(spec of prop.Specifications) {
        specIds.push(spec.id);
      }
    }
  }
  return specIds;
}

async function addProperties(id, data) {
  await models.sequelize.transaction(async transaction=> {
    let Promotion = await models.Promotion.findByPk(id, {transaction});

    if(!Promotion)
      throwException('E020')

    await Promotion.setProperties(data.properties, {transaction});
    await Promotion.update({status: 'I'}, {transaction});
  });
}

async function addEspecification(id, data) {
  await models.sequelize.transaction(async transaction=> {
    let Promotion = await models.Promotion.findByPk(id, {transaction});

    if(!Promotion)
      throwException('E020')
    const specifications = [data.specifications[0]]
    await Promotion.setSpecifications(specifications, {transaction});
    await Promotion.update({status: 'I'}, {transaction});
  });
}

async function deletePromotion(id) {
  let Promotion = await models.Promotion.findByPk(id)
  Promotion.update({status:'E'})
}

async function removePromotion(id) {
  await models.sequelize.transaction(async transaction=> {
    let Promotion = await models.Promotion.findOne({where: {id}}, {transaction});
    
    if(!Promotion)
      throwException('E020')
    
    await Promotion.setProperties([]);
    await Promotion.setSpecification(null);
    await Promotion.update({status:'G'}, {transaction});
  });
}

module.exports = {
  getPromotionAll,
  getPromotion,
  addPromotion,
  addProperties,
  addEspecification,
  updatePromotion,
  deletePromotion,
  activatePromotion,
  removePromotion
}