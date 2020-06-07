const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId10() {

await models.Property.bulkCreate([
    { 
      ubication: "La libertad, Carrera 30 con calle 30", buildDate: "24/01/1993", TypeServiceId: 1, 
      ClientId: 4, TypePropertyId: 3, status: C.PROPERTY_PUBLISHED, ParishId: 456
    },
  ])
  
  //publicationId 10
await models.Publication.bulkCreate([
    {
      title: "Terreno ideal para locales", description: "Descripción extensa", price: 8700000.99, PropertyId: 10
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/terreno.jpg",
      description: "Foto",
      PublicationId: 10,
      TypeImageId: 4 //dejar igual
    },{ 
      url: url + "/public/imgs/property/terreno2.jpg",
      description: "Foto",
      PublicationId: 10,
      TypeImageId: 4 //dejar igual
    }
  ])

    await models.PropertySpecification.bulkCreate([
        {
          PropertyId: 10,
          SpecificationId: 7,
          quantity: 500,
        },
        {
          PropertyId: 10,
          SpecificationId: 23,
          quantity: true,
        },
        {
          PropertyId: 10,
          SpecificationId: 24,
          quantity: false,
        },
        {
          PropertyId: 10,
          SpecificationId: 25,
          quantity: true,
        },
        {
          PropertyId: 10,
          SpecificationId: 26,
          quantity: true,
        },
        {
          PropertyId: 10,
          SpecificationId: 27,
          quantity: false,
        },
        {
          PropertyId: 10,
          SpecificationId: 28,
          quantity: true ,
        },
      ])

}

module.exports = propertyId10
