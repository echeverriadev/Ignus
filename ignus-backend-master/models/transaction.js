const helper = require("../global/helpers");
const {moment} = require("../global/helpers");
const C = require("../config/properties/constants")



module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    status: {
      defaultValue: C.TRANSACTION_IN_PROCESS,
      type: DataTypes.STRING(1),
    },
    inProcessDate: {
      type: DataTypes.DATE,
      defaultValue: function() {
        return new Date()
      },
      get: function() {
        const value = this.getDataValue('inProcessDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    incidenceDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('incidenceDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    completedDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('completedDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    publishedDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('publishedDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    finishedDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('finishedDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    canceledDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('canceledDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    qualifiedDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('qualifiedDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    },
    reservedDate: {
      type: DataTypes.DATE,
      get: function() {
        const value = this.getDataValue('reservedDate')
        return value ? moment(value).format("DD/MM/YYYY h:mm:ss a") : ''
      },
    }
  }, {
    hooks: {
      afterUpdate: (transaction, options) => {
        const field = C.DATE_TRANSACTION_STATUS[transaction.status]
        if(transaction[field]){
          transaction[field] = new Date()
          transaction.save({transaction: options.transaction})
        }
      },
    },
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return C.STATUS_TRANSACTION_STR[statusValue];
      }
    }
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Request);
    Transaction.hasMany(models.Incidence);
    Transaction.hasOne(models.Contract);
    Transaction.belongsToMany(models.Activity, {
      through: 'TransactionActivity',
    });
    Transaction.belongsToMany(models.Requirement, {
      through: 'TransactionRequirement',
    });
    Transaction.belongsToMany(models.TypeCalification, {
      through: 'Calification',
      foreignKey: 'TransactionId',
    })
  };

  Transaction.addScope('defaultScope', {
    order: [
      ['id', 'ASC']
    ],
  }, { override: true })
  return Transaction;
};
