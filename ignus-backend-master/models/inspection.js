const helper = require("../global/helpers");


module.exports = (sequelize, DataTypes) => {
  const Inspection = sequelize.define('Inspection', {
      status: { 
        defaultValue: "A", 
        type: DataTypes.STRING(1),
      },
      urlFileInspection: DataTypes.STRING(2000),
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
        },
        defaultValue: function() {
            return helper.getCurrentDate();
        },
      },
  });
  
  Inspection.associate = (models) => {
    Inspection.belongsTo(models.Request);
  }
  return Inspection;
};