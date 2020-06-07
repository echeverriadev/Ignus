const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function InitialpropertyId16() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector la catedral Av principal", buildDate: "23/01/1983", 
      ClientId: 1, TypePropertyId: 5, status: C.PROPERTY_INITIAL, ParishId: 999, TypeServiceId: 3
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 16,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 1,
      quantity: 3,
    },
    {
      PropertyId: 16,
      SpecificationId: 7,
      quantity: 700,
    },
    {
      PropertyId: 16,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 16,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 16,
      SpecificationId: 27,
      quantity: true,
    },
    {
      PropertyId: 16,
      SpecificationId: 28,
      quantity: false,
    },
  ])
}

module.exports = InitialpropertyId16
