module.exports = (sequelize, DataTypes) => {
  const TypeSpecification = sequelize.define('TypeSpecification', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  TypeSpecification.associate = (models) => {
    TypeSpecification.hasMany(models.Specification);
  };
  
  TypeSpecification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeSpecification;
};