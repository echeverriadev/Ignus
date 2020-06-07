const helper = require("../global/helpers");

const status = {
  'E': "Por responder",
  'A': "Atendida",
  'B': "Borrada"
}

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { 
      defaultValue: "E", 
      type: DataTypes.STRING(1),
      get: function() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      },
    },
    guestEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Correo no valido"
        }
      },
      defaultValue: null
    },
    contactDate: {
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
        return helper.convertUsToEuDate(this.getDataValue('contactDate'));
      },
      set: function(val) {
        this.setDataValue('contactDate', helper.convertEuToUsDate(val));
      }
    },
    answerDate: {
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
        const asnwerDate = this.getDataValue('asnwerDate')
          return asnwerDate ? helper.convertUsToEuDate(asnwerDate) : null;
      },
      set: function(val) {
        this.setDataValue('answerDate', helper.convertEuToUsDate(val));
      }
    },
  });
  
  Contact.associate = (models) => {
    Contact.belongsTo(models.User);
    Contact.belongsTo(models.TypeContact);
    Contact.belongsTo(models.Subject);
  };
  
  Contact.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Contact;
};