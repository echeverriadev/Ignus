const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId9() {

await models.Property.bulkCreate([
    { 
      ubication: "Carrera 30 con calle 30", buildDate: "24/01/1993", TypeServiceId: 2, 
      ClientId: 4, TypePropertyId: 6, status: C.PROPERTY_PUBLISHED, ParishId: 456
    },
  ])
  
  //publicationId 9
await models.Publication.bulkCreate([
    {
      title: "Anexo cómodo para dos personas", description: "Descripción extensa", price: 9500000.99, PropertyId: 9
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/apartamento.jpg",
      description: "Foto de mi habitación",
      PublicationId: 9,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/habitacionsuite.jpg",
      description: "Foto de mi habitación",
      PublicationId: 9,
      TypeImageId: 4 //dejar igual
    },
  ])

    await models.PropertySpecification.bulkCreate([
        {
          PropertyId: 9,
          SpecificationId: 3,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 6,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 8,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 9,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 1,
          quantity: 1,
        },
        {
          PropertyId: 9,
          SpecificationId: 2,
          quantity: 2,
        },
        {
          PropertyId: 9,
          SpecificationId: 4,
          quantity: 1,
        },
        {
          PropertyId: 9,
          SpecificationId: 11,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 13,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 14,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 15,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 16,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 17,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 18,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 19,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 21,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 22,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 20,
          quantity: 3,
        },
        {
          PropertyId: 9,
          SpecificationId: 23,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 24,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 25,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 26,
          quantity: true,
        },
        {
          PropertyId: 9,
          SpecificationId: 27,
          quantity: false,
        },
        {
          PropertyId: 9,
          SpecificationId: 28,
          quantity: true ,
        },
      ])

}

module.exports = propertyId9
