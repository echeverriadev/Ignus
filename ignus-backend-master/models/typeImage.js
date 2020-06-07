module.exports = (sequelize, DataTypes) => {
  const TypeImage = sequelize.define('TypeImage', {
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

  TypeImage.associate = (models) => {
    TypeImage.hasMany(models.Image);
  }
  
  TypeImage.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return TypeImage;
};