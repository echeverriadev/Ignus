module.exports = (sequelize, DataTypes) => {
  const TypeServiceRequirement = sequelize.define('TypeServiceRequirement', {
      id: { 
          type: DataTypes.INTEGER, 
          autoIncrement: true,
          primaryKey: true
      },
  });
  TypeServiceRequirement.associate = (models) => {
    TypeServiceRequirement.belongsTo(models.Requirement);
  }
  
  return TypeServiceRequirement;
};