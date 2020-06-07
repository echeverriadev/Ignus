module.exports = (sequelize, DataTypes) => {
  const Calification = sequelize.define('Calification', {
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  
  Calification.associate = (models) => {
    Calification.belongsTo(models.TypeCalification);
    Calification.belongsTo(models.QualificationCriteria);
    Calification.belongsTo(models.Transaction);
  };
  
  Calification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return Calification;
};