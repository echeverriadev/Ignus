const url = require("../config").url;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Correo ya existe"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Correo no valido"
        },
        notEmpty: {
          args: true,
          msg: "Correo obligatorio"
        } 
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Contraseña no puede ser vacía"
        },
        notEmpty: {
          args: true,
          msg: "Contraseña no puede ser vacía"
        },
        len: [4,8]
      }
    },
    urlAvatar: {
      type: DataTypes.STRING(2000),
      defaultValue: url + "/public/imgs/avatar/avatardefault.png"
    },
    notificationSMS: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notificationEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notificationWS: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Client);
    User.hasOne(models.Employee);
    User.belongsToMany(models.Role, {
      through: 'UserRole'
    });
    User.hasMany(models.Notification);
  };

  return User;
};