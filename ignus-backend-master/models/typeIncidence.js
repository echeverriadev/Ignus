module.exports = (sequelize, DataTypes) => {
  const TypeIncidence = sequelize.define('TypeIncidence', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING(1),
      defaultValue: 'A'
    }
  });
  
  TypeIncidence.associate = (models) => {
    TypeIncidence.hasMany(models.Incidence);
  };
  
  return TypeIncidence;
};