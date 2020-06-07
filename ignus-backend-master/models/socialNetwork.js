module.exports = (sequelize, DataTypes) => {
  const SocialNetwork = sequelize.define('SocialNetwork', {
    name: DataTypes.STRING,
    urlLogo: DataTypes.STRING,
    fontAwesome: DataTypes.STRING,
    iconIonic: DataTypes.STRING,
    urlAgencySocialNetwork: {
      type:DataTypes.STRING(2000),
      validate: {
        isUrl: {
         args: true,
         msg: "No es una url valida"
        },
        notEmpty: {
         args: true,
         msg: "No es una url valida"
        }
      },
    },
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });
  
  SocialNetwork.associate = (models) => {
    SocialNetwork.belongsTo(models.Agency);
  };

  SocialNetwork.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  
  return SocialNetwork;
};