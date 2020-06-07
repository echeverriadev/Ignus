const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId6() {

await models.Property.bulkCreate([
    { 
      ubication: "Sector La lagunita calle 16", buildDate: "23/01/1873", 
      ClientId: 2, TypePropertyId: 8, TypeServiceId: 1, status: C.PROPERTY_PUBLISHED, ParishId: 13
    },
  ])

//publicationId 5
await models.Publication.bulkCreate([
    {
      title: "Apartamento ideal para estudiantes...", description: "Descripción corta", price: 300000.50, PropertyId: 6
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/apartamentoestudio.jpg",
      description: "Foto de mi habitación",
      PublicationId: 6,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/apartamento.jpg",
      description: "Foto de mi habitación",
      PublicationId: 6,
      TypeImageId: 4 //dejar igual
    },
  ])

await models.PropertySpecification.bulkCreate([
    {
      PropertyId: 6,
      SpecificationId: 3,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 6,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 8,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 9,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 1,
      quantity: 5,
    },
    {
      PropertyId: 6,
      SpecificationId: 2,
      quantity: 3,
    },
    {
      PropertyId: 6,
      SpecificationId: 4,
      quantity: 0,
    },
    {
      PropertyId: 6,
      SpecificationId: 11,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 13,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 14,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 15,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 16,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 17,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 18,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 19,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 21,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 22,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 20,
      quantity: 3,
    },
    {
      PropertyId: 6,
      SpecificationId: 23,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 24,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 25,
      quantity: true,
    },
    {
      PropertyId: 6,
      SpecificationId: 26,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 27,
      quantity: false,
    },
    {
      PropertyId: 6,
      SpecificationId: 28,
      quantity: true,
    },
  ])
}

module.exports = propertyId6
