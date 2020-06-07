module.exports = (sequelize, DataTypes) => {
  const TypeProperty = sequelize.define('TypeProperty', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  TypeProperty.associate = (models) => {
    TypeProperty.hasMany(models.Property);
    TypeProperty.belongsToMany(models.Specification, {
      through: 'TypePropertySpecification'
    });
  };
  
  TypeProperty.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeProperty;
};