module.exports = (sequelize, DataTypes) => {
  const TypeContact = sequelize.define('TypeContact', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  TypeContact.associate = (models) => {
    TypeContact.hasMany(models.Contact);
  };
  
  TypeContact.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeContact;
};