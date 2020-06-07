module.exports = (sequelize, DataTypes) => {
  const TypeRequest = sequelize.define('TypeRequest', {
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

  TypeRequest.associate = (models) => {
    TypeRequest.hasMany(models.Request);
  }
  TypeRequest.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return TypeRequest;
};