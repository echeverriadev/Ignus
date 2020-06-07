const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId14() {

await models.Property.bulkCreate([
    { 
      ubication: "Centro comercial sambil", buildDate: "23/01/1993", 
      ClientId: 1, TypePropertyId: 4, status: C.PROPERTY_RESERVED, ParishId: 734, TypeServiceId: 2
    },
  ])

//publicationId 14
await models.Publication.bulkCreate([
    {
      title: "Ideal para venta de ropa", description: "Casa en buen estado", price: 9580000.50, PropertyId: 14
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/local.jpg",
      description: "Foto del frente",
      PublicationId: 14,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 14,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 6,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 14,
      SpecificationId: 2,
      quantity: 4,
    },
    {
      PropertyId: 14,
      SpecificationId: 4,
      quantity: 5,
    },
    {
      PropertyId: 14,
      SpecificationId: 5,
      quantity: 1,
    },
    {
      PropertyId: 14,
      SpecificationId: 7,
      quantity: 200,
    },
    {
      PropertyId: 14,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 17,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 20,
      quantity: 2,
    },
    {
      PropertyId: 14,
      SpecificationId: 21,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 23,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 26,
      quantity: true,
    },
    {
      PropertyId: 14,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 14,
      SpecificationId: 28,
      quantity: true,
    },
  ])
}

module.exports = propertyId14
