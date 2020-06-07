const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId8() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector Juan de Villegas", buildDate: "23/01/1993", 
      ClientId: 4, TypePropertyId: 1, status: C.PROPERTY_PUBLISHED, ParishId: 465, TypeServiceId: 1
    },
  ])

//publicationId 8
await models.Publication.bulkCreate([
    {
      title: "Casa familiar", description: "Casa en buen estado", price: 2300000.50, PropertyId: 8
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/casa3.jpg",
      description: "Foto del frente",
      PublicationId: 8,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/casa2.jpg",
      description: "Foto de la cocina",
      PublicationId: 8,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 8,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 6,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 8,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 1,
      quantity: 5,
    },
    {
      PropertyId: 8,
      SpecificationId: 2,
      quantity: 3,
    },
    {
      PropertyId: 8,
      SpecificationId: 4,
      quantity: 1,
    },
    {
      PropertyId: 8,
      SpecificationId: 7,
      quantity: 500,
    },
    {
      PropertyId: 8,
      SpecificationId: 10,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 12,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 14,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 20,
      quantity: 6,
    },
    {
      PropertyId: 8,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 8,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 26,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 27,
      quantity: true,
    },
    {
      PropertyId: 8,
      SpecificationId: 28,
      quantity: false,
    }
  ])
}
module.exports = propertyId8
