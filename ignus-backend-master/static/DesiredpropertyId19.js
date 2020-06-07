const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function DesiredpropertyId19() {

await models.Property.bulkCreate([
    { 
      ubication: "Urbanización las rosas. Cementerio", buildDate: "23/01/1983", 
      ClientId: 2, TypePropertyId: 1, status: C.PROPERTY_DESIRED, ParishId: 5, TypeServiceId: 4
    },
  ])


await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 19,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 6,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 8,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 19,
      SpecificationId: 2,
      quantity: 6,
    },
    {
      PropertyId: 19,
      SpecificationId: 4,
      quantity: 2,
    },
    {
      PropertyId: 19,
      SpecificationId: 7,
      quantity: 300,
    },
    {
      PropertyId: 19,
      SpecificationId: 10,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 12,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 14,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 16,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 17,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 19,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 21,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 22,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 20,
      quantity: 3,
    },
    {
      PropertyId: 19,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 19,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 19,
      SpecificationId: 28,
      quantity: true,
    }
  ])
}

module.exports = DesiredpropertyId19
