module.exports = (sequelize, DataTypes) => {
  const Municipality = sequelize.define('Municipality', {
    name: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  Municipality.associate = (models) => {
    Municipality.belongsTo(models.State);
    Municipality.hasMany(models.Parish);
  }
  
  Municipality.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })
  
  return Municipality;
};



