const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId2() {

await models.Property.bulkCreate([
    { 
      ubication: "Centro comercial metropolis", buildDate: "23/01/1793", 
      ClientId: 4, TypePropertyId: 4, status: C.PROPERTY_PUBLISHED, ParishId: 1034, TypeServiceId: 2
    },
  ])

//publicationId 2
await models.Publication.bulkCreate([
    {
      title: "Ideal para peluqueria y barberia", description: "Descripción corta", price: 89000.50, PropertyId: 2
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/local2.jpg",
      description: "Foto del frente",
      PublicationId: 2,
      TypeImageId: 4 //dejar igual
    },{ 
      url: url + "/public/imgs/property/local.jpg",
      description: "Foto del frente",
      PublicationId: 2,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 2,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 6,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 2,
      SpecificationId: 2,
      quantity: 4,
    },
    {
      PropertyId: 2,
      SpecificationId: 4,
      quantity: 5,
    },
    {
      PropertyId: 2,
      SpecificationId: 5,
      quantity: 1,
    },
    {
      PropertyId: 2,
      SpecificationId: 7,
      quantity: 600,
    },
    {
      PropertyId: 2,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 20,
      quantity: 2,
    },
    {
      PropertyId: 2,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 26,
      quantity: true,
    },
    {
      PropertyId: 2,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 2,
      SpecificationId: 28,
      quantity: true,
    },
  ])
}

module.exports = propertyId2
