const helper = require("../global/helpers");

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    identification: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Identificación ya existe"
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('birthDate'));
      },
      set: function(val) {
        this.setDataValue('birthDate', helper.convertEuToUsDate(val));
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bankName: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: { 
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    }
  });

  Client.associate = (models) => {
    Client.belongsTo(models.User);
    Client.belongsTo(models.Parish);
    Client.hasMany(models.Property);
    Client.hasMany(models.Request);
    Client.belongsToMany(models.Specification, {
      through: 'ClientSpecification',
      foreignKey: 'ClientId',
    });
  };

  return Client;
};