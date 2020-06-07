const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function InitialpropertyId18() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector tamaca, calle 14 entre Av. 1A y 1B", buildDate: "23/01/1983", TypeServiceId: 4, 
      ClientId: 2, TypePropertyId: 7, status: C.PROPERTY_INITIAL, ParishId: 1000
    },
  ])


await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 18,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 6,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 8,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 1,
      quantity: 3,
    },
    {
      PropertyId: 18,
      SpecificationId: 2,
      quantity: 0,
    },
    {
      PropertyId: 18,
      SpecificationId: 4,
      quantity: 2,
    },
    {
      PropertyId: 18,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 13,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 19,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 20,
      quantity: 2,
    },
    {
      PropertyId: 18,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 18,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 18,
      SpecificationId: 28,
      quantity: false ,
    },
  ])
}

module.exports = InitialpropertyId18
