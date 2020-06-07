module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
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

  Activity.associate = (models) => {
    Activity.belongsToMany(models.TypeService, {
      through: 'TypeServiceActivity',
      foreignKey: 'ActivityId',
    });
    Activity.belongsToMany(models.Transaction, {
      through: 'TransactionActivity',
      foreignKey: 'ActivityId',
    });
  }
  
  Activity.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return Activity;
};

