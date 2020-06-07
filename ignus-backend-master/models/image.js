module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING(2000),
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  Image.associate = (models) => {
    Image.belongsTo(models.TypeImage);
    Image.belongsTo(models.Agency);
    Image.belongsTo(models.Publication);
  }
  
  
  Image.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return Image;
};