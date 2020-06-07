const models = require("../models");
const sFunction = require("./sFunction");
const {throwException, getWorkingDays} = require("../global/helpers");

// For generate random password
var generator = require('generate-password');

async function createUser(data) {
  return await models.User.create({
    username: data.username,
		password: generator.generate({length: 8, numbers: true, excludeSimilarCharacters: true}).toLocaleUpperCase()
  });
}

async function createUserClient(data) {
  const persistedClient =  await models.sequelize.transaction(async transaction=>{ 
    data.password =  generator.generate({length: 8, numbers: true, excludeSimilarCharacters: true}).toLocaleUpperCase();
    data.username = data.username.toLowerCase() 
    const user = await models.User.create(data, {transaction});
    const client = await models.Client.create(data, {transaction});
    await user.setClient(client, {transaction});
    await user.setRoles([4],{transaction});
    return client;
  });
  
  return persistedClient;
}

async function createUserEmployee(data) {
  const persistedEmployee = await models.sequelize.transaction(async transaction => {
    data.password =  generator.generate({length: 8, numbers: true, excludeSimilarCharacters: true}).toLocaleUpperCase();
    data.username = data.username.toLowerCase() 
    data.notificationEmail = data.notificationSMS = data.notificationWS = true;
    const user = await models.User.create(data, {transaction});
    const employee = await models.Employee.create(data, {transaction});
    const jsonDays = await getWorkingDays(data.days);
    const workingDays = await models.Day.create(jsonDays, {transaction});
    
    await workingDays.setEmployee(employee, {transaction});
    await user.setEmployee(employee, {transaction});
    await user.setRoles(data.roles,{transaction});
    return employee;
  });


  return persistedEmployee;
}

async function assignRoles(data, user_id) {
  const user = await models.User.findByPk(user_id);
  if (!user)
    throwException('E002');
  else
    await user.setRoles(data.roles);
}

async function takeOffRole(role_id, user_id) {
  const user = await models.User.findByPk(user_id);
  if (!user)
    throwException('E002');
  else
    user.removeRole(role_id);
}

async function getMenuForUser(user_id, typeApp = 'I') {
  let function_ids = [];
  let roles = await getRolesByUser(user_id);
  
  if(!roles || !roles.length)
    throwException('E006');
  for (let rol of roles) {
    for (let func of rol.Functions) {
      function_ids.push(func.id);
    }
  }

  const functions = await sFunction.getFunctionsByUniqIds(function_ids, typeApp);
  return functions;
}

async function getRolesByUser(user_id) {
  let user = await models.User.findByPk(user_id);
  if(!user)
    throwException('E002');
  
  let roles = await user.getRoles({ include: [{ model: models.Function }] });
  return roles;
}

function getUserAll() {
  return models.User.findAll({
    include: [{
      model: models.Client,
    },{
      model: models.Employee,
    }]
  });
}

async function getUserByCredentials(username, password) {
  const User = await models.User.findOne({
    where: {username: username.toLowerCase(), password},
    include: [{
      model: models.Client,
    },{
      model: models.Employee,
    }]
  });

  if (!User)
    throwException('E002')
  else
  {
    const firstFunction = await getFirstLinkableFunctionByUser(User)
    let objUser = User.toJSON();
    objUser.Function = firstFunction
    return objUser;
  }
}

async function getUserById(user_id) {
  let user = await models.User.findOne({
    where: {id : user_id},
    include: [
      {
          model: models.Client
      },{
          model: models.Employee
      },
    ]
  })
  
  if(!user)
    throwException('E001')
  
  return user
}

async function updateUser(userId,fields) {
  let user = await getUserById(userId)
  const { currentPassword, newPassword } = fields;
  if(currentPassword != user.password)
    throwException('E035')
  await user.update({password : newPassword})
}

async function getFirstLinkableFunctionByUser(User) {
  const roles = await User.getRoles({
    include: [{
      model: models.Function,
      where: { typeApplication: 'I' }
    }]
    
  });
  let function_ids = []
  for (let rol of roles) {
    for (let func of rol.Functions) {
      function_ids.push(func.id);
    }
  }
  function_ids.sort((a,b)=> a-b)
  const firstFunction = await models.Function.findOne({where: { id: function_ids[0]}})
  console.log(firstFunction.toJSON());
  return firstFunction.toJSON()
  
  
}



module.exports = {
  createUser,
  createUserClient,
  createUserEmployee,
  getUserById,
  getUserAll,
  getUserByCredentials,
  getMenuForUser,
  getRolesByUser,
  assignRoles,
  takeOffRole,
  updateUser
}