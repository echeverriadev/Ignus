module.exports = (sequelize, DataTypes) => {
  const TypeCalification = sequelize.define('TypeCalification', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  TypeCalification.associate = (models) => {
    TypeCalification.belongsToMany(models.Transaction, {
      through: 'Calification',
      foreignKey: 'TypeCalificationId',
    })
  };
  
  TypeCalification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeCalification;
};