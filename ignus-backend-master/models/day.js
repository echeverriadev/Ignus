const all_days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    sunday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    monday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tuesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    wednesday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    thursday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    friday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    saturday: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  },{
    getterMethods: {
      arrayDaysOfWorks() {
        let arrayDaysOfWorks = []
        for(let i = 0; i<7; i++)
          if(this.getDataValue(all_days[i]))
            arrayDaysOfWorks.push(i);
        return arrayDaysOfWorks
      },
      arrayFreeDays() {
        let arrayFreeDays = []
        for(let i = 0; i<7; i++)
          if(!this.getDataValue(all_days[i]))
            arrayFreeDays.push(i);
        return arrayFreeDays
      }
    }
  });

  Day.associate = (models) => {
    Day.belongsTo(models.Employee);
  }
  
  Day.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })
  
  return Day;
};


