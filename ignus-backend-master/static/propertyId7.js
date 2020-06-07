const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId7() {

await models.Property.bulkCreate([
    { 
      ubication: "Quibor sector la libertad", buildDate: "24/01/1993", TypeServiceId: 2, 
      ClientId: 2, TypePropertyId: 8, status: C.PROPERTY_FINISHED, ParishId: 250
    },
  ])
  
  //publicationId 7
await models.Publication.bulkCreate([
    {
      title: "Apartamento ideal para estudiantes...", description: "Descripción corta", price: 300000.50, PropertyId: 7
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/apartamentoestudio.jpg",
      description: "Foto de mi habitación",
      PublicationId: 7,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/apartamento.jpg",
      description: "Foto de mi habitación",
      PublicationId: 7,
      TypeImageId: 4 //dejar igual
    },
  ])

    await models.PropertySpecification.bulkCreate([
        {
          PropertyId: 7,
          SpecificationId: 3,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 6,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 8,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 9,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 1,
          quantity: 1,
        },
        {
          PropertyId: 7,
          SpecificationId: 2,
          quantity: 2,
        },
        {
          PropertyId: 7,
          SpecificationId: 4,
          quantity: 1,
        },
        {
          PropertyId: 7,
          SpecificationId: 11,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 13,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 14,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 15,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 16,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 17,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 18,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 19,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 21,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 22,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 20,
          quantity: 3,
        },
        {
          PropertyId: 7,
          SpecificationId: 23,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 24,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 25,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 26,
          quantity: true,
        },
        {
          PropertyId: 7,
          SpecificationId: 27,
          quantity: false,
        },
        {
          PropertyId: 7,
          SpecificationId: 28,
          quantity: true ,
        },
      ])

}

module.exports = propertyId7
