module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    header: DataTypes.STRING,
    menu: DataTypes.STRING,
    background: DataTypes.STRING,
    status: {
      type: DataTypes.STRING(1),
      defaultValue: 'A'
    }
  });
  
  return Color;
};