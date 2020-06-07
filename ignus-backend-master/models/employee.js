module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    identification: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Identificación ya existe"
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: { 
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    },
    phoneNumber: DataTypes.STRING,
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.User);
    Employee.hasMany(models.Request);
    Employee.hasOne(models.Day);
  };

  return Employee;
};