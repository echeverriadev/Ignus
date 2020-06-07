const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function InitialpropertyId17() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector ibarra plaza central", buildDate: "23/01/1983", 
      ClientId: 1, TypePropertyId: 1, status: C.PROPERTY_INITIAL, ParishId: 2, TypeServiceId: 4
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 17,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 6,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 8,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 17,
      SpecificationId: 2,
      quantity: 6,
    },
    {
      PropertyId: 17,
      SpecificationId: 4,
      quantity: 2,
    },
    {
      PropertyId: 17,
      SpecificationId: 7,
      quantity: 300,
    },
    {
      PropertyId: 17,
      SpecificationId: 10,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 12,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 14,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 16,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 19,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 21,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 20,
      quantity: 4,
    },
    {
      PropertyId: 17,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 17,
      SpecificationId: 27,
      quantity: true,
    },
    {
      PropertyId: 17,
      SpecificationId: 28,
      quantity: true,
    }
  ])
}

module.exports = InitialpropertyId17

