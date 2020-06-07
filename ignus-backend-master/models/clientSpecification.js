module.exports = (sequelize, DataTypes) => {
  const ClientSpecification = sequelize.define('ClientSpecification', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  });
  
  return ClientSpecification;
};