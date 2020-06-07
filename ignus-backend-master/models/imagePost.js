module.exports = (sequelize, DataTypes) => {
  const ImagePost = sequelize.define('ImagePost', {
    url: DataTypes.STRING(2000),
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  ImagePost.associate = (models) => {
    ImagePost.belongsTo(models.Property);
  }
  
  ImagePost.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return ImagePost;
};