const models = require("../models");
const {getDaysDiff, Op, convertEuToUsDate, moment} = require("../global/helpers");
const { MONTHS } = require("../config/properties/constants");

async function getRequestByTypeServices(query = {}) {
  let parentWhere = {};
  let where = {};
  let categories = MONTHS;
  let series = [{name: 'Rechazadas', data: []}, {name: 'Aceptadas', data:[]}];
  let data = [['Rechazadas', 0], ['Aceptadas', 0]];
  let total = 0, totalAcept = 0, totalReject = 0;
  let start = query.start;
  let end = query.end;

  series[0]['data'] = new Array(categories.length).fill(0);
  series[1]['data'] = new Array(categories.length).fill(0);

  if (query.typeS) { parentWhere['id'] = query.typeS}
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    
    where.requestDate = {
      [Op.between]: [
        startValue,
        endValue
      ]
    }
  }
  
  const search = await models.TypeService.findAll({
    where: parentWhere,
    include: [{ model: models.Request, where }]
  });
  
  for(let i = 0; i < search.length; i++) {
    for(request of search[i].Requests) {
      if (request.status == 'R') {
        total += 1;
        totalReject += 1;
        let month = new Date(convertEuToUsDate(request.requestDate)).getMonth();
        series[0]['data'][month] += 1; 
      } else if (request.status == 'A') {
        total += 1;
        totalAcept += 1;
        let month = new Date(convertEuToUsDate(request.requestDate)).getMonth();
        series[1]['data'][month] += 1;
      }
    }
  }

  if (total != 0) {
    data[0][1] = parseFloat( ((totalReject * 100) / total).toFixed(2) );
    data[1][1] = parseFloat( ((totalAcept * 100) / total).toFixed(2) );
  } else {
    data[0][1] = 0;
    data[1][1] = 0;
  }

  const report = { categories: categories, series: series, cakeData: data }

  return report;
}


async function getAppointments(query = {}) {
  let where = {}
  let start = query.start;
  let end = query.end;
  let total = 0, totalReq = 0, totalCon = 0;
  let categories = MONTHS;
  let series = [{name: 'Solicitadas', data: []}, {name: 'Confirmadas', data:[]}];
  let data = [['Solicitadas', 0], ['Confirmadas', 0]];

  if (query.emp) { where['$Request.Employee.id$'] = query.emp }
  if (query.typeS) { where['$Request.TypeService.id$'] = query.typeS }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    where['dateAppointment'] = { [Op.between]: [startValue, endValue] }
  }

  const search = await models.Appointment.findAll({
    where,
    include: [
      { model: models.Request, include: [
          { model: models.Client },
          { model: models.Employee },
          { model: models.Property },
          { model: models.TypeService },
        ] 
      },
      { model: models.TypeAppointment }
    ]
  })

  series[0]['data'] = new Array(categories.length).fill(0);
  series[1]['data'] = new Array(categories.length).fill(0);

  for(appoint of search) {
    if (appoint.status == 'S') {
      total += 1;
      totalReq += 1;
      let month = new Date(convertEuToUsDate(appoint.dateAppointment)).getMonth();
      series[0]['data'][month] += 1; 
    } else if (appoint.status == 'C') {
      total += 1;
      totalCon += 1;
      let month = new Date(convertEuToUsDate(appoint.dateAppointment)).getMonth();
      series[1]['data'][month] += 1;
    }
  }

  if (total != 0) {
    data[0][1] = parseFloat( ((totalReq * 100) / total).toFixed(2) );
    data[1][1] = parseFloat( ((totalCon * 100) / total).toFixed(2) );
  } else {
    data[0][1] = 0;
    data[1][1] = 0;
  }

  const report = { categories: categories, series: series, cakeData: data }

  return report;
}

async function getTypeServiceReport(query) {
  let where = { };
  let categories = MONTHS;
  let series = [];
  let start = query.start;
  let end = query.end;

  if (query.typeP) { where['$Properties.TypeProperty.id$'] = query.typeP }
  if (query.state) { where['$Properties.Parish.Municipality.State.name$'] = query.state}
  if (query.municipality) { where['$Properties.Parish.Municipality.name$'] = query.municipality}
  if (query.parish) { where['$Properties.Parish.name$'] = query.parish}
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    where['$Properties.Publication.createdAt$'] = { [Op.between]: [startValue, endValue] }
  }

  const services = await models.TypeService.findAll({
    where,
    include: [
      { model: models.Request },
      { model: models.Property, include: [
        { model: models.Publication },
        { model: models.TypeProperty, },
        { model: models.Parish, include: [{model: models.Municipality, include: [{model: models.State}]}] }
      ]}
    ]
  })

  for(service of services) {
    let data = new Array(categories.length).fill(0);
    let quantity = new Array(categories.length).fill(0);

    for(request of service.Requests) {
      let date = request.requestDate;
      let month = new Date(convertEuToUsDate(date)).getMonth();
      data[month] += 1;
      quantity[month] += 1;
    }
    for (let i = 0; i < data.length; i++) {
      total = service.Requests.length ? service.Requests.length : 1;
      data[i] = parseFloat( (data[i] / total).toFixed(2) );
    }

    series.push({name: service.name, data: data, quantity: quantity});
  }

  const report = {categories: categories, series: series};

  return report;
}

async function getIncidenceReport(query) {
  let where = {};
  let data = [];
  let quantity = [];
  let onlyQuantity = [];
  let categories = MONTHS;
  let start = query.start;
  let end = query.end;

  data = new Array(categories.length).fill(0);
  quantity = new Array(categories.length).fill(0);
  onlyQuantity = new Array(categories.length).fill(0);

  if (query.typeS) { where['$Transaction.Request.TypeService.id$'] = query.typeS }
  if (query.typeI) { where['$TypeIncidence.id$'] = query.typeI }
  if (query.status) { where['status'] = {[Op.in]: query.status} }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    where['incidenceDate'] = { [Op.between]: [startValue, endValue] }
  }

  const incidences = await models.Incidence.findAll({
    where,
    include: [
      { model: models.TypeIncidence },
      { model: models.Transaction, include: [
        { model: models.Request, include: [
          { model: models.TypeService }
        ] }
      ] }
    ]
  });

  for(incidence of incidences) {
    let service = incidence.Transaction.Request.TypeService;
    let imonth = new Date(convertEuToUsDate(incidence.incidenceDate)).getMonth();
    onlyQuantity[imonth] += 1;

    let cal = parseFloat( (((onlyQuantity[imonth]) * 100) / incidences.length).toFixed(2) );

    data[imonth] = { name: service.name, y: cal };
    quantity[imonth] = { name: service.name, y: onlyQuantity[imonth] }
  }

  for (let i = 0; i < data.length; i++) {
    if(data[i] == 0) { 
      data[i] = {name: "", y: 0 };
      quantity[i] = {name: "", y: 0 };
    }
  }

  const report = {categories: categories, data: data, quantity: quantity};
  return report;
}

async function getContactReport(query) {
  let where = {};
  let series = [];
  let categories = MONTHS;
  let quantity = new Array(categories.length).fill(0);
  let start = query.start;
  let end = query.end;

  if (query.typeC) { where['$Contacts.TypeContact.id$'] = query.typeC }
  if (query.status) { where['$Contacts.status$'] = {[Op.in]: query.status} }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    where['$Contacts.contactDate$'] = { [Op.between]: [startValue, endValue] }
  }

  const subjects = await models.Subject.findAll({
    where,
    include: [
      { model: models.Contact, include: [{ model: models.TypeContact }] }
    ]
  })

  for(subject of subjects) {
    let data = new Array(categories.length).fill(0);
    
    for(contact of subject.Contacts) {
      let date = convertEuToUsDate(contact.contactDate);
      let month = new Date(date).getMonth();
      data[month] += 1;
      quantity[month] += 1;
    }
    for (let i = 0; i < data.length; i++) {
      total = subject.Contacts.length ? subject.Contacts.length : 1;
      data[i] = data[i] / total;
    }
    
    series.push({name: subject.name, data: data });
  }
  
  const report = {categories: categories, series: series, quantity: quantity};
  return report;
}

async function getTransactionReport(query) {
  let where = {};
  let series = getTransactionState();
  let typeServ = [];
  let start = query.start;
  let end = query.end;

  if (query.emp) { where['$Request.Employee.id$'] = query.emp}
  if (query.typeP) { where['$Request.Property.TypeProperty.id$'] = query.typeP }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01'
    let endValue = end && end.length ? end : '3000-12-31'
    where['inProcessDate'] = { [Op.between]: [startValue, endValue] }
  }

  const allServices = await models.TypeService.findAll();

  const transactions = await models.Transaction.findAll({
    where,
    include: [
      { model: models.Request, include: [
        { model: models.Employee },
        { model: models.TypeService },
        { model: models.Property, include: [{ model: models.TypeProperty }] }
      ] }
    ]
  })

  for(s of allServices) { typeServ.push(s.name); }

  for(t of transactions) {
    let s = t.Request.TypeService;
    let index = typeServ.findIndex(function(x) { return x == s.name });
    
    series[0]['data'][index] += getDaysDiff(t.inProcessDate, t.completedDate);
    series[1]['data'][index] += getDaysDiff(t.completedDate, t.reservedDate);
    series[2]['data'][index] += getDaysDiff(t.publishedDate, t.finishedDate);
    series[3]['data'][index] += getDaysDiff(t.finishedDate, t.qualifiedDate);
    series[5]['data'][index] += getDaysDiff(t.reservedDate, t.finishedDate);
  }

  const report = {categories: typeServ, series: series }
  return report;
}

function getTransactionState() {
  return [
    {name: 'En proceso', data: [0,0,0,0]},
    {name: 'Completada', data: [0,0,0,0]},
    {name: 'Publicada', data: [0,0,0,0]},
    {name: 'Finalizada', data: [0,0,0,0]},
    {name: 'Calificada', data: [0,0,0,0]},
    {name: 'Reservada', data: [0,0,0,0]},
  ]
}
/*
En proceso
Completada
Reservada
Finalizada
Calificada

En proceso
Completada
Publicada
Finalizada
Calificada
*/

async function getClientsReport(query) {
  let where = buildQuery(query);
  let categories = MONTHS;
  let data = [['Con solicitudes', 0], ['Sin solicitudes', 0]];
  let series = [{name: 'Con solicitudes', data: []}, {name: 'Sin solicitudes', data:[]}];
  let withRequest = 0;
  let noRequest = 0;

  series[0]['data'] = new Array(categories.length).fill(0);
  series[1]['data'] = new Array(categories.length).fill(0);

  const users = await models.Client.findAll({
    where,
    include: [{ model: models.Request, include: [{ model: models.TypeService }] }]
  })  

  for (user of users) {
    if (user.Requests.length > 0) {
      let month = new Date(user.createdAt).getMonth();
      series[0]['data'][month] += 1;
      withRequest += 1;
    } else {
      let month = new Date(user.createdAt).getMonth();
      series[1]['data'][month] += 1;
      noRequest += 1;
    }
  }

  const total = users.length;

  if (total != 0) {
    data[0][1] = parseFloat( ((withRequest * 100) / total).toFixed(2) );
    data[1][1] = parseFloat( ((noRequest * 100) / total).toFixed(2) );
  } else {
    data[0][1] = 0;
    data[1][1] = 0;
  }

  const report = { categories: categories, series: series, cakeData: data }

  return report;
}

function buildQuery(query) {
  let where = {};
  let start = query.start;
  let end = query.end;
  let minAge = query.minage;
  let maxAge = query.maxage;

  if (query.gender) { where['gender'] = query.gender }
  /*
  if (query.parish) { where['$Parish.name$'] = query.parish }
  if (query.municipality) { where['$Parish.Municipality.name$'] = query.municipality }
  if (query.state) { where['$Parish.Municipality.State.name$'] = query.state }
  if (query.typeS) { where['$Requests.TypeService.id$'] = query.typeS }
  */
  if (minAge || maxAge) {
    let mindate = null;
    let maxdate = null;

    if (minAge) {
      mindate = moment().subtract(minAge, 'years').toDate().getFullYear() + '-12-31';
    }
    if (maxAge) {
      maxdate = moment().subtract(maxAge, 'years').toDate().getFullYear() + '-12-31';
    }
    
    let startValue = mindate && mindate.length ? mindate : '3000-12-31';
    let endValue = maxdate && maxdate.length ? maxdate : '1900-01-01';
    
    where.birthDate = {
      [Op.between]: [
        endValue,
        startValue
      ]
    }
  }
  if (start || end) {
    let startValue = start && start.length ? start : '1900-01-01';
    let endValue = end && end.length ? end : '3000-12-31';

    where.createdAt = {
      [Op.between]: [
        startValue,
        endValue
      ]
    }
  }

  return where;
}

function buildMonths(start = 0, end = 11) {
  let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  let arrayMonths = months.slice(start, end + 1);
  return arrayMonths;
}

module.exports = {
  getRequestByTypeServices,
  getAppointments,
  getTypeServiceReport,
  getIncidenceReport,
  getContactReport,
  getTransactionReport,
  getClientsReport
}