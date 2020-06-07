const helper = require("../global/helpers");
const {moment} = require("../global/helpers");

const status = {
  'V': "Visualizada",
  'P': "Pendiente",
}

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    text: DataTypes.STRING(2000),
    status: {
      defaultValue: "P", 
      type: DataTypes.STRING(1),
      get: function() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      }
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: function() {
        return new Date()
      },
      get: function() {
        const value = this.getDataValue('creationDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    }
  });
  
  Notification.associate = (models) => {
      Notification.belongsTo(models.User);
      Notification.belongsTo(models.TypeNotification);
  };
  
  Notification.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return Notification;
};