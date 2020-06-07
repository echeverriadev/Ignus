module.exports = (sequelize, DataTypes) => {
  const Parish = sequelize.define('Parish', {
    name: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  Parish.associate = (models) => {
    Parish.belongsTo(models.Municipality);
    Parish.hasMany(models.Client);
    Parish.hasMany(models.Property);
  }
  
  Parish.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })
  
  return Parish;
};



