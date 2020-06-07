module.exports = (sequelize, DataTypes) => {
  const TypeAppointment = sequelize.define('TypeAppointment', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING(1),
      defaultValue: 'A'
    }
  });
  
  TypeAppointment.associate = (models) => {
    TypeAppointment.hasMany(models.Appointment);
  };
  
  return TypeAppointment;
};