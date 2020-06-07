const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId1() {

await models.Property.bulkCreate([
    { 
      ubication: "Guadalupe Av 1A", buildDate: "23/01/1993", 
      ClientId: 2, TypePropertyId: 5, status: C.PROPERTY_PUBLISHED, ParishId: 234, TypeServiceId: 1
    },
  ])

//publicationId 1
await models.Publication.bulkCreate([
    {
      title: "Perfecto para almacen", description: "Descripción larga", price: 1780000.50, PropertyId: 1
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/galpon3.jpg",
      description: "Foto del frente",
      PublicationId: 1,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/galpon1.jpg",
      description: "Foto de la cocina",
      PublicationId: 1,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 1,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 1,
      SpecificationId: 7,
      quantity: 250,
    },
    {
      PropertyId: 1,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 17,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 23,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 1,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 1,
      SpecificationId: 28,
      quantity: true,
    },
  ])
}

module.exports = propertyId1
