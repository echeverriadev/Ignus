module.exports = (sequelize, DataTypes) => {
  const QualificationCriteria = sequelize.define('QualificationCriteria', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre obligatorio"
        }
      },
    },
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  QualificationCriteria.associate = (models) => {
    QualificationCriteria.hasMany(models.Calification);
  }
  QualificationCriteria.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return QualificationCriteria;
};