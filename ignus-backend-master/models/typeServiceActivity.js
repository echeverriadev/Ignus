module.exports = (sequelize, DataTypes) => {
  const TypeServiceActivity = sequelize.define('TypeServiceActivity', {
      id: { 
          type: DataTypes.INTEGER, 
          autoIncrement: true,
          primaryKey: true
      },
  });
  
  TypeServiceActivity.associate = (models) => {
    TypeServiceActivity.belongsTo(models.Activity);
  }
  
  return TypeServiceActivity;
};