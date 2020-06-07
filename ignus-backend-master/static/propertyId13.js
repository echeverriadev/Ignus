const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId13() {

await models.Property.bulkCreate([
    { 
      ubication: "Guadalupe Av 1A", buildDate: "23/01/1993", 
      ClientId: 2, TypePropertyId: 5, status: C.PROPERTY_PUBLISHED, ParishId: 234, TypeServiceId: 1
    },
  ])

//publicationId 13
await models.Publication.bulkCreate([
    {
      title: "Galpón ideal para producción", description: "Descripción larga", price: 780000.50, PropertyId: 13
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/galpon.jpg",
      description: "Foto del frente",
      PublicationId: 13,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/galpon2.jpg",
      description: "Foto de la cocina",
      PublicationId: 13,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 13,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 13,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 13,
      SpecificationId: 7,
      quantity: 500,
    },
    {
      PropertyId: 13,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 13,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 17,
      quantity: true,
    },
    {
      PropertyId: 13,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 23,
      quantity: true,
    },
    {
      PropertyId: 13,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 13,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 13,
      SpecificationId: 28,
      quantity: false,
    },
  ])
}

module.exports = propertyId13
