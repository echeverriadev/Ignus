const helper = require("../global/helpers");
const C = require("../config/properties/constants")


module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    ubication: DataTypes.STRING,
    status: { 
      defaultValue: C.PROPERTY_INITIAL, 
      type: DataTypes.STRING(1),
    },
    buildDate: {
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
      defaultValue: null,
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('buildDate'));
      },
      set: function(val) {
        this.setDataValue('buildDate', helper.convertEuToUsDate(val));
      }
    }
  },{
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return C.STATUS_PROPERTY_STR[statusValue];
      },
      typeServiceStringOpposite() {
        const TypeServiceId = this.getDataValue('TypeServiceId');
        return C.TYPE_SERVICE_OPPOSITE_STRING[TypeServiceId]
      }
    }
  });
  
  Property.associate = (models) => {
    Property.hasOne(models.Publication);
    Property.belongsTo(models.TypeService);
    Property.belongsTo(models.TypeProperty);
    Property.belongsTo(models.Parish);
    Property.belongsToMany(models.Promotion, {
      through: 'PropertyPromotion'
    });
    Property.belongsTo(models.Client);
    Property.belongsToMany(models.Specification, {
      through: 'PropertySpecification',
      foreignKey: 'PropertyId',
    });
    Property.hasMany(models.ImagePost);
    Property.hasMany(models.Request);
  };
  
  Property.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Property;
};