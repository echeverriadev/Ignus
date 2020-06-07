module.exports = (sequelize, DataTypes) => {
  const PropertySpecification = sequelize.define('PropertySpecification', {
    quantity: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1,
      set: function(val) {
        let quantity
        if(val===false)
          quantity=-2
        else if(val===true)
          quantity=-1
        else
          quantity=val
        this.setDataValue('quantity',quantity)
      },
      get: function() {
        const quantity = this.getDataValue('quantity');
        if(quantity==-2)
          return false
        else if(quantity==-1)
          return true
        else
          return quantity
      }},
  });
  
  return PropertySpecification;
};