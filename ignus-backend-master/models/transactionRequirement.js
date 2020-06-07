const helper = require("../global/helpers");

const status = {
  'E':"Espera",
  'A':"Aceptado",
  'R':"Rechazado",
}

module.exports = (sequelize, DataTypes) => {
  const TransactionRequirement = sequelize.define('TransactionRequirement', {
      status: { 
        defaultValue: "E", 
        type: DataTypes.STRING(1),
        get: function() {
          const statusValue = this.getDataValue('status');
          return status[statusValue];
        },
      },
      urlFileRequirement: DataTypes.STRING(2000),
      observation: DataTypes.STRING(2000),
      uploadDate: {
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
        get: function() {
          const uploadDate = this.getDataValue('uploadDate')
          return uploadDate ? helper.convertUsToEuDate(uploadDate) : null;
        },
        set: function(val) {
          this.setDataValue('uploadDate', helper.convertEuToUsDate(val));
        }
      },
      reviewDate: {
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
        get: function() {
          const reviewDate = this.getDataValue('reviewDate')
          return reviewDate ? helper.convertUsToEuDate(reviewDate) : null;
        },
        set: function(val) {
          this.setDataValue('reviewDate', helper.convertEuToUsDate(val));
        }
      },
  });
  
  TransactionRequirement.associate = (models) => {
    TransactionRequirement.belongsTo(models.Requirement);
    TransactionRequirement.belongsTo(models.Transaction);
  }
  
  return TransactionRequirement;
};