module.exports = (sequelize, DataTypes) => {
  const TypeService = sequelize.define('TypeService', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    urlImage: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
    offeringProperty: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
  
  TypeService.associate = (models) => {
    TypeService.belongsToMany(models.Requirement, {
      through: 'TypeServiceRequirement',
    });
    TypeService.belongsToMany(models.Activity, {
      through: 'TypeServiceActivity',
      foreignKey: 'TypeServiceId',
    });
    TypeService.hasMany(models.Property);
    TypeService.hasMany(models.Request);
  };
  
  TypeService.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeService;
};