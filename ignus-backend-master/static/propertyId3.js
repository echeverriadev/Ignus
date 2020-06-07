const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId3() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector Juan de Villegas", buildDate: "23/01/1993", 
      ClientId: 5, TypePropertyId: 1, status: C.PROPERTY_PUBLISHED, ParishId: 265, TypeServiceId: 2
    },
  ])

//publicationId 3
await models.Publication.bulkCreate([
    {
      title: "Casa amueblada en buena zona", description: "Casa en buen estado", price: 92300000.50, PropertyId: 3
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/casa3.jpg",
      description: "Foto del frente",
      PublicationId: 3,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/casa2.jpg",
      description: "Foto de la cocina",
      PublicationId: 3,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 3,
      SpecificationId: 3,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 6,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 8,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 1,
      quantity: 2,
    },
    {
      PropertyId: 3,
      SpecificationId: 2,
      quantity: 2,
    },
    {
      PropertyId: 3,
      SpecificationId: 4,
      quantity: 2,
    },
    {
      PropertyId: 3,
      SpecificationId: 7,
      quantity: 300,
    },
    {
      PropertyId: 3,
      SpecificationId: 10,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 11,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 12,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 13,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 14,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 15,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 18,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 21,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 22,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 20,
      quantity: 3,
    },
    {
      PropertyId: 3,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 3,
      SpecificationId: 24,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 26,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 27,
      quantity: true,
    },
    {
      PropertyId: 3,
      SpecificationId: 28,
      quantity: true,
    }
  ])
} 

module.exports = propertyId3
