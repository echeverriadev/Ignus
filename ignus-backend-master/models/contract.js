const helper = require("../global/helpers");

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    urlFileContract: DataTypes.STRING(2000),
    folioNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Contrato ya existe"
      },
    },
    elaborationDate: {
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
        return helper.convertUsToEuDate(this.getDataValue('elaborationDate'));
      },
      set: function(val) {
        this.setDataValue('elaborationDate', helper.convertEuToUsDate(val));
      }
    },
    firmDate: {
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
        let data = this.getDataValue('firmDate');
        if (data == null)
          return ""
        else
          return helper.convertUsToEuDate(data);
      },
      set: function(val) {
        this.setDataValue('firmDate', helper.convertEuToUsDate(val));
      }
    },
    status: {
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    }
  });

  Contract.associate = (models) => {
    Contract.belongsTo(models.Transaction);
    Contract.belongsToMany(models.Warranty, {
      through: 'ContractWarranty'
    });
  };

  return Contract;
};