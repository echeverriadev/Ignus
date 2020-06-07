module.exports = (sequelize, DataTypes) => {
  const Warranty = sequelize.define('Warranty', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });
  
  Warranty.associate = (models) => {
    Warranty.belongsToMany(models.Contract, {
      through: 'ContractWarranty',
    });
  };
  return Warranty;
};