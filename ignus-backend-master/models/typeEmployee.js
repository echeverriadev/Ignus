module.exports = (sequelize, DataTypes) => {
  const TypeEmployee = sequelize.define('TypeEmployee', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  TypeEmployee.associate = (models) => {
    TypeEmployee.hasMany(models.Employee);
  };

  return TypeEmployee;
};