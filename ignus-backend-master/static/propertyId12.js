const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId12() {

await models.Property.bulkCreate([
    { 
      ubication: "Guadalupe Av 1A", buildDate: "23/01/1993", 
      ClientId: 2, TypePropertyId: 5, status: C.PROPERTY_PUBLISHED, ParishId: 234, TypeServiceId: 1
    },
  ])

//publicationId 12
await models.Publication.bulkCreate([
    {
      title: "Casa familiar", description: "Casa en buen estado", price: 5700000.50, PropertyId: 12
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/casa2.jpg",
      description: "Foto del frente",
      PublicationId: 12,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/casa3.jpg",
      description: "Foto de la cocina",
      PublicationId: 12,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 12,
      SpecificationId: 1,
      quantity: 5,
    },
    {
      PropertyId: 12,
      SpecificationId: 2,
      quantity: 2,
    },
    {
      PropertyId: 12,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 12,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 4,
      quantity: 1,
    },
    {
      PropertyId: 12,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 16,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 22,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 20,
      quantity: 5,
    },
    {
      PropertyId: 12,
      SpecificationId: 23,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 12,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 12,
      SpecificationId: 28,
      quantity: false,
    },
  ])
}

module.exports = propertyId12
