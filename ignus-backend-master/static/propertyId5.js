const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId5() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector tamaca, calle 14 entre Av. 1A y 1B", buildDate: "23/01/1983", TypeServiceId: 2, 
      ClientId: 3, TypePropertyId: 7, status: C.PROPERTY_RESERVED, ParishId: 130
    },
  ])

//publicationId 5
await models.Publication.bulkCreate([
    {
      title: "Habitación amueblada ideal para familia pequeña", description: "Descripción corta", price: 1500000.99, PropertyId: 5
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/habitacionsuite.jpg",
      description: "Foto de mi habitación",
      PublicationId: 5,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/apartamento.jpg",
      description: "Foto de mi habitación",
      PublicationId: 5,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 5,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 6,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 8,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 5,
      SpecificationId: 2,
      quantity: 1,
    },
    {
      PropertyId: 5,
      SpecificationId: 4,
      quantity: 3,
    },
    {
      PropertyId: 5,
      SpecificationId: 11,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 16,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 19,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 22,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 20,
      quantity: 2,
    },
    {
      PropertyId: 5,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 5,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 5,
      SpecificationId: 28,
      quantity: true ,
    },
  ])
}

module.exports = propertyId5
