const helper = require("../global/helpers");

const status = {
  'S': "Solicitada",
  'C': "Confirmada",
  'E': "Ejecutada",
  'D': "Eliminada"
}

const colorStatus = {
  'S': {
      primary: "#E3BC08",
      secondary: "#FDF1BA"
    },
  'C': {
      primary: "#AD2121",
      secondary: "#FAE3E3"
    },
  'E': {
      primary: "#1E90FF",
      secondary: "#D1E8FF"
    },
}

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    reason: DataTypes.STRING(2000),
    turn: {
      type: DataTypes.STRING(2),
      defaultValue: "AM"
    },
    dateAppointment: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: "Debe ser una Fecha"
        }
      },
      notEmpty: {
        args: true,
        msg: "No puede ser vacio"
      },
      set: function(val) {
        this.setDataValue('dateAppointment', helper.convertEuToUsDate(val));
      }
    },
    status: {
      type: DataTypes.STRING(1),
      defaultValue: "S"
    },
  }, {
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      },
      colorStatus() {
        const statusValue = this.getDataValue('status');
        return colorStatus[statusValue];
      },
      dateAppointmentUS() {
        let dateAppointment = this.getDataValue('dateAppointment') || "";
        return dateAppointment.replace(/-/g,'/')
      },
      dateAppointmentEU() {
        let dateAppointment = this.getDataValue('dateAppointment');
        return dateAppointment ? helper.convertUsToEuDate(dateAppointment) : "";
      },
      dateAppointmentUSv2() {
        let dateAppointment = this.getDataValue('dateAppointment') || "";
        return dateAppointment.replace(/-/g,',')
      },
    }
  });

  // Falta asociarlo con Agende
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Request);
    Appointment.belongsTo(models.TypeAppointment);
  };

  return Appointment;
};
