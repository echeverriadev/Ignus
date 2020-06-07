module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT
  });
  
  Publication.associate = (models) => {
    Publication.belongsTo(models.Property);
    Publication.hasMany(models.Image);
  };
  
  Publication.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Publication;
};