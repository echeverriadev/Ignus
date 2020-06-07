const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment")
moment.locale('es')

// This method is for convert the US format date to EU format date
function convertUsToEuDate(inputFormat) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	let d = new Date(inputFormat);
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

// This method is for convert the EU format date to US format date
function convertEuToUsDate(inputFormat) {
  let date = inputFormat.split("/");
  return date.reverse().join("-");
}

// This method is for convert the EU format date to US format date witn - instead of /
function getCurrentDate() {
  let date = new Date();
  let str_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return str_date;
}

function throwException(codeMessage){
    const messages = require("../config/properties/messages");
    throw {code: codeMessage, message: messages[codeMessage]}
}

function getFirstPropertyOfObject(obj){
  return obj[Object.keys(obj)[0]];
}

// return uniq values of array (user filter function)
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function getWorkingDays(days) {
  let all_days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  let json_days = {
    'sunday': false,
    'monday': false,
    'tuesday': false,
    'wednesday': false,
    'thursday': false,
    'friday': false,
    'saturday': false
  };

  for(let i=0; i<days.length; i++) {
    let pos = days[i];
    json_days[[ all_days[pos] ]] = true;
  }

  return json_days;
}

function getDaysDiff(fDate, sDate) {
  let oneDay = 24*60*60*1000;
  let start = new Date(convertEuToUsDate(fDate.slice(0,10)));
  let end = new Date(convertEuToUsDate(sDate.slice(0,10)));
  let diffDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));
  let result = diffDays ? diffDays : 0
  
  return result;
}

module.exports = {
  convertEuToUsDate,
  convertUsToEuDate,
  getCurrentDate,
  throwException,
  getFirstPropertyOfObject,
  onlyUnique,
  getWorkingDays,
  Op,
  moment,
  getDaysDiff
}