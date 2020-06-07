const models = require("../models");
const url = require("../config").url;
const C = require("../config/properties/constants");

async function propertyId11() {

await models.Property.bulkCreate([
    { 
      ubication: "La municipal callejón san juan", buildDate: "24/01/1993", TypeServiceId: 2, 
      ClientId: 4, TypePropertyId: 3, status: C.PROPERTY_PUBLISHED, ParishId: 470
    },
  ])
  
  //publicationId 11
await models.Publication.bulkCreate([
    {
      title: "Terreno con condiciones para plantar", description: "Descripción extensa", price: 18700000.99, PropertyId: 11
    },
  ])

await models.Image.bulkCreate([
    { 
      url: url + "/public/imgs/property/terreno2.jpg",
      description: "Foto",
      PublicationId: 11,
      TypeImageId: 4 //dejar igual
    },
    { 
      url: url + "/public/imgs/property/terreno.jpg",
      description: "Foto",
      PublicationId: 11,
      TypeImageId: 4 //dejar igual
    }
  ])

    await models.PropertySpecification.bulkCreate([
        {
          PropertyId: 11,
          SpecificationId: 7,
          quantity: 760,
        },
        {
          PropertyId: 11,
          SpecificationId: 23,
          quantity: false,
        },
        {
          PropertyId: 11,
          SpecificationId: 24,
          quantity: false,
        },
        {
          PropertyId: 11,
          SpecificationId: 25,
          quantity: true,
        },
        {
          PropertyId: 11,
          SpecificationId: 26,
          quantity: false,
        },
        {
          PropertyId: 11,
          SpecificationId: 27,
          quantity: true,
        },
        {
          PropertyId: 11,
          SpecificationId: 28,
          quantity: false ,
        },
      ])

}

module.exports = propertyId11
