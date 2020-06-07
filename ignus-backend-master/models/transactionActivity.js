const helper = require("../global/helpers");

const status = {
  'E':"Espera",
  'A':"Aceptado",
  'R':"Rechazado",
}

module.exports = (sequelize, DataTypes) => {
  const TransactionActivity = sequelize.define('TransactionActivity', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      observation: DataTypes.STRING(2000),
      nextToExecute: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      status: { 
        type: DataTypes.STRING(1),
        defaultValue: "E", 
        get: function() {
          const statusValue = this.getDataValue('status');
          return status[statusValue];
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
  
  TransactionActivity.associate = (models) => {
    TransactionActivity.belongsTo(models.Activity);
    TransactionActivity.belongsTo(models.Transaction);
  };
  
  return TransactionActivity;
};