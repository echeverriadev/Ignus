module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    urlImage: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'G' },
  });
  
  Promotion.associate = (models) => {
    Promotion.belongsToMany(models.Specification, {
      through: 'SpecificationPromotion'
    });
    Promotion.belongsToMany(models.Property, {
      through: 'PropertyPromotion'
    });
  };
  
  Promotion.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Promotion;
};