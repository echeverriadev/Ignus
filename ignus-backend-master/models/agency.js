module.exports = (sequelize, DataTypes) => {
  var Agency = sequelize.define('Agency', {
    rif: DataTypes.STRING,
    name: DataTypes.STRING,
    mission: DataTypes.STRING(2000),
    vision: DataTypes.STRING(2000),
    generalObjective: DataTypes.STRING(2000),
    ubication: DataTypes.STRING(2000),
    foundationDate: DataTypes.DATEONLY,
    phoneNumber: DataTypes.STRING,
    phoneNumber2: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  Agency.associate = (models) => {
    Agency.hasMany(models.SocialNetwork);
    Agency.hasMany(models.Image);
  };
  return Agency;
};