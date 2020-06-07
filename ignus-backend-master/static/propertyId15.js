const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId15() {

await models.Property.bulkCreate([
    { 
      ubication: "El atardecer carrera 16", buildDate: "23/01/1983", 
      ClientId: 1, TypePropertyId: 5, status: C.PROPERTY_PUBLISHED, ParishId: 23, TypeServiceId: 1
    },
  ])

//publicationId 15
await models.Publication.bulkCreate([
    {
      title: "Galpón espacioso con estantes", description: "Descripción larga", price: 90000000.50, PropertyId: 15
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/galpon2.jpg",
      description: "Foto del frente",
      PublicationId: 15,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/galpon.jpg",
      description: "Foto de la cocina",
      PublicationId: 15,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 15,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 1,
      quantity: 3,
    },
    {
      PropertyId: 15,
      SpecificationId: 7,
      quantity: 1000,
    },
    {
      PropertyId: 15,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 15,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 15,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 17,
      quantity: true,
    },
    {
      PropertyId: 15,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 15,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 15,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 15,
      SpecificationId: 28,
      quantity: false,
    },
  ])
}

module.exports = propertyId15
