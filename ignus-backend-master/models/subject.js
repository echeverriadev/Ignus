module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  Subject.associate = (models) => {
    Subject.hasMany(models.Contact);
  };
  
  Subject.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Subject;
};