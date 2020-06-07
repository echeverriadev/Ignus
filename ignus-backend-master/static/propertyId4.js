const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId4() {

await models.Property.bulkCreate([
    { 
      ubication: "Quibor sector la libertad", buildDate: "24/01/1993", TypeServiceId: 1, 
      ClientId: 1, TypePropertyId: 7, status: C.PROPERTY_PUBLISHED, ParishId: 250
    },
  ])

//publicationId 4
    await models.Publication.bulkCreate([
        {
          title: "Habitación confortable", description: "Descripción corta", price: 91500.00, PropertyId: 4
        },
      ])

    await models.Image.bulkCreate([
        { 
          url: url + "/public/imgs/property/cocina4.jpg",
          description: "Foto de mi cocina",
          PublicationId: 4,
          TypeImageId: 4 //dejar igual
        }
      ])


    await models.PropertySpecification.bulkCreate([
        {
          PropertyId: 4,
          SpecificationId: 3,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 6,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 8,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 9,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 1,
          quantity: 1,
        },
        {
          PropertyId: 4,
          SpecificationId: 2,
          quantity: 3,
        },
        {
          PropertyId: 4,
          SpecificationId: 4,
          quantity: 3,
        },
        {
          PropertyId: 4,
          SpecificationId: 11,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 13,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 14,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 15,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 16,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 17,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 18,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 19,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 21,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 22,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 20,
          quantity: 5,
        },
        {
          PropertyId: 4,
          SpecificationId: 23,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 24,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 25,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 26,
          quantity: true,
        },
        {
          PropertyId: 4,
          SpecificationId: 27,
          quantity: false,
        },
        {
          PropertyId: 4,
          SpecificationId: 28,
          quantity: true ,
        },
      ])

}

module.exports = propertyId4