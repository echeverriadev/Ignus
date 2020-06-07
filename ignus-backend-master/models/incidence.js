const helper = require("../global/helpers");

const status = {
  'E': "Por responder",
  'A': "Atendida",
  'B': "Borrada"
}

module.exports = (sequelize, DataTypes) => {
  const Incidence = sequelize.define('Incidence', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    incidenceDate: {
      type: DataTypes.DATEONLY,
      defaultValue: function() {
        return helper.getCurrentDate();
      },
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('incidenceDate'));
      },
      set: function(val) {
        this.setDataValue('incidenceDate', helper.convertEuToUsDate(val));
      }
    },
    conclusion: DataTypes.STRING(2000),
    decision: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
      get: function() {
        if(this.getDataValue('decision') == true)
          return "Transacción cancelada"
        else if(this.getDataValue('decision') == false)
          return "Transacción en Continuidad"
        else
          return "En espera"
      },
    },
    status: { 
      defaultValue: "E", 
      type: DataTypes.STRING(1),
    },
    transactionStatus: DataTypes.STRING(1)
  },{
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      }
    }
  });
  
  Incidence.associate = (models) => {
    Incidence.belongsTo(models.Transaction);
    Incidence.belongsTo(models.TypeIncidence);
  };
  
  return Incidence;
};