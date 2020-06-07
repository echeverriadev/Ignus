module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
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

  Requirement.associate = (models) => {
    Requirement.belongsToMany(models.TypeService, {
      through: 'TypeServiceRequirement',
    });
    Requirement.belongsToMany(models.Transaction, {
      through: 'TransactionRequirement',
    });
  }
  Requirement.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return Requirement;
};