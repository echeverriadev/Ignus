const helper = require("../global/helpers");

const status = {
  'S': "Solicitada",
  'R': "Rechazada",
  'A': "Aprobada",
  'F': "Finalizada",
  'D': "Deseada"
}

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    comment: DataTypes.STRING(2000),
    requestDate: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          args: true,
          msg: "No puede ser vacio"
        },
        isDate: {
          args: true,
          msg: "Debe ser de tipo fecha"
        }
      },
      defaultValue: function() {
        return helper.getCurrentDate();
      },
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('requestDate'));
      },
      set: function(val) {
        this.setDataValue('requestDate', helper.convertEuToUsDate(val));
      }
    },
    aprobationDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "No puede ser vacio"
        },
        isDate: {
          args: true,
          msg: "Debe ser de tipo fecha"
        }
      },
      get: function() {
        let data = this.getDataValue('aprobationDate');
        if (data == null)
          return ""
        else
          return helper.convertUsToEuDate(data);
      },
      set: function(val) {
        this.setDataValue('aprobationDate', helper.convertEuToUsDate(val));
      }
    },
    attendedDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "No puede ser vacio"
        },
        isDate: {
          args: true,
          msg: "Debe ser de tipo fecha"
        }
      },
      get: function() {
        let data = this.getDataValue('attendedDate');
        if (data == null)
          return ""
        else
          return helper.convertUsToEuDate(data);
      },
      set: function(val) {
        this.setDataValue('attendedDate', helper.convertEuToUsDate(val));
      }
    },
    wishDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: "No puede ser vacio"
        },
        isDate: {
          args: true,
          msg: "Debe ser de tipo fecha"
        }
      },
      get: function() {
        let data = this.getDataValue('wishDate');
        if (data == null)
          return ""
        else
          return helper.convertUsToEuDate(data);
      },
      set: function(val) {
        this.setDataValue('wishDate', helper.convertEuToUsDate(val));
      }
    },
    status: { 
      defaultValue: "S", 
      type: DataTypes.STRING(1),
    }
  },{
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      }
    }
  });

  Request.associate = (models) => { 
    Request.belongsTo(models.TypeRequest);
    Request.belongsTo(models.TypeService);
    Request.belongsTo(models.Client);
    Request.belongsTo(models.Employee);
    Request.belongsTo(models.Property);
    Request.hasOne(models.Transaction);
    Request.hasMany(models.Appointment);
    Request.hasMany(models.Inspection);
  };
  
  Request.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })

  return Request;
};