const models = require("../models");
const {throwException} = require("../global/helpers");


async function getActivitiesAll() {
  return await models.Activity.findAll({where: {status:'A'}})
}

async function getActivity(id) {
  let activity = await models.Activity.findOne({where: {id, status : 'A'}})
  if(!activity)
    throwException('E013')
  return activity;
}

async function addActivity(data) {
  await models.Activity.create(data)
}

async function updateActivity(id,data) {
  let activityOld = await getActivity(id)
  await activityOld.update(data);
}

async function deleteActivity(id) {
  let activityOld = await getActivity(id)
  await activityOld.update({status:'E'});
}

module.exports = {
  getActivitiesAll,
  addActivity,
  updateActivity,
  getActivity,
  deleteActivity
}