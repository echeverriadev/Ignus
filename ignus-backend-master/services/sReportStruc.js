const models = require("../models");
const {throwException, Op, convertEuToUsDate} = require("../global/helpers");

async function clientsWithoutRequest(query) {
  let where = buildQuery(query);
  let test = [];

  const users = await models.Client.findAll({
    where,
    include: [{ model: models.Request, include: [{ model: models.TypeService }] }]
  })

  return users;
}

function buildQuery(query) {
  let where = {};
  let start = query.start;
  let end = query.end;

  if (query.gender) { where['gender'] = query.gender }
  if (query.parish) { where['$Parish.name$'] = query.parish }
  if (query.municipality) { where['$Parish.Municipality.name$'] = query.municipality }
  if (query.state) { where['$Parish.Municipality.State.name$'] = query.state }
  if (query.typeS) { where['$Requests.TypeService.id$'] = query.typeS }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    
    where.createdAt = {
      [Op.between]: [
        startValue,
        endValue
      ]
    }
  }

  return where;
}

module.exports = {
  clientsWithoutRequest
}