module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  State.associate = (models) => {
    State.hasMany(models.City);
    State.hasMany(models.Municipality);
  }
  
  State.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })
  
  return State;
};