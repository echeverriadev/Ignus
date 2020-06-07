const sReport = require("../services/sReport"),
      sReportStruc = require("../services/sReportStruc"),
  {makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");
  
async function requestByTypeServices(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getRequestByTypeServices(query);
    makeResponseOk(res, {report}, "report/requestByTypeService");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function appointmentsReport(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getAppointments(query);
    makeResponseOk(res, {report}, "report/appointments");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function typeServiceReport(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getTypeServiceReport(query);
    makeResponseOk(res, {report}, "report/typeService");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function incidenceReport(req, res) {
  try {
    let query = req.query;
    if (query.hasOwnProperty('status') && query.status.length)
      query.status = req.query.status.split(',');
    const report = await sReport.getIncidenceReport(query);
    makeResponseOk(res, {report}, "report/incidences");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function contactReport(req, res) {
  try {
    let query = req.query;
    if (query.hasOwnProperty('status') && query.status.length)
      query.status = req.query.status.split(',');
    const report = await sReport.getContactReport(query);
    //res.status(200).json(report);
    makeResponseOk(res, {report}, "report/typeService");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function transactionReport(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getTransactionReport(query);
    //res.status(200).json(report);
    makeResponseOk(res, {report}, "report/typeService");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function clientsReport(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getClientsReport(query);
    makeResponseOk(res, {report}, "report/requestByTypeService");
  } catch(err) {
    makeResponseException(res, err);
  }
}

// STRUCTURE REPORTS 

async function getClientsWithoutRequest(req, res) {
  try {
    let query = req.query;
    const report = await sReportStruc.clientsWithoutRequest(query);
    res.status(200).json(report);
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  requestByTypeServices,
  appointmentsReport,
  typeServiceReport,
  incidenceReport,
  contactReport,
  transactionReport,
  clientsReport,
  // Structure reports
  getClientsWithoutRequest
}