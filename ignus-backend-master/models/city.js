module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  City.associate = (models) => {
    City.belongsTo(models.State);
  }
  
  City.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })
  
  return City;
};



