const models = require("../models");
const { saveFile } = require("../global/fileSystem")

async function addPublication(data, transaction, image = null) {
  const publication = await models.Publication.create(data, {transaction});
  let publicUrl;
  if (image) {
    if (Array.isArray(image)) {
      for (let img of image) {
        publicUrl = saveFile(img.path, "property");
        saveImage(publicUrl, publication, transaction)
      }
    } else {
      publicUrl = saveFile(image.path, "property");
      saveImage(publicUrl, publication, transaction)
    }
  }
  return publication;
}

async function saveImage(publicUrl, publication, transaction) {
  await models.Image.create({ 
    url: publicUrl, 
    TypeImageId : 4,
    PublicationId: publication.id
  }, {transaction});

  //imageModel.setPublication(publication, {transaction});
}

module.exports = {
  addPublication
}