module.exports = (sequelize, DataTypes) => {
  const TypeNotification = sequelize.define('TypeNotification', {
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
    urlImage: DataTypes.STRING(2000),
    urlRedirectIntranet: {
      type: DataTypes.STRING(2000),
      defaultValue: '#'
    },
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  TypeNotification.associate = (models) => {
    TypeNotification.hasMany(models.Notification);
  }
  
  TypeNotification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return TypeNotification;
};