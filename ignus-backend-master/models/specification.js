module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
    typeInput: { type: DataTypes.STRING, defaultValue: 'checkbox' }
  });
  
  Specification.associate = (models) => {
    Specification.belongsTo(models.TypeSpecification);
    Specification.belongsToMany(models.Promotion, {
      through: 'SpecificationPromotion'
    });
    Specification.belongsToMany(models.Property, {
      through: 'PropertySpecification',
      foreignKey: 'SpecificationId',
    });
    Specification.belongsToMany(models.Client, {
      through: 'ClientSpecification',
      foreignKey: 'SpecificationId',
    });
    Specification.belongsToMany(models.TypeProperty, {
      through: 'TypePropertySpecification'
    });
  };
  
  Specification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Specification;
};