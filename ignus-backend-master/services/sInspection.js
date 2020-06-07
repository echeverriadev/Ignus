const models = require("../models");
const { throwException } = require("../global/helpers");
const { saveFile } = require("../global/fileSystem")


async function getInspectionsAll() {
    return await models.Inspection.findAll({
        where: { status: 'A' },
        include: [{
            model: models.Request,
            include: [{
                model: models.Client,
                include: [{ model: models.User }]
            }, {
                model: models.Employee,
            }, {
                model: models.TypeService,
            }],
        }]
    })
}

async function getInspection(id) {
    let inspection = await models.Inspection.findOne({
        where: { status: 'A', id },
        include: [{
            model: models.Request,
            include: [{
                model: models.Client,
                include: [{ model: models.User }]
            }, {
                model: models.Employee,
            }, {
                model: models.TypeService,
            }],
        }]
    })
    if (!inspection)
        throwException('E053')
    return inspection;
}

async function addInspection(data, document) {
    const urlFileInspection = saveFile(document.path,"inspection")
    data.urlFileInspection = urlFileInspection
    await models.Inspection.create(data);
}

async function updateInspection(id, data, document=null) {
    console.log(document)
    let inspectionOld = await getInspection(id)
    if(document){
        const urlFileInspection = saveFile(document.path,"inspection")
        data.urlFileInspection = urlFileInspection
    }
    await inspectionOld.update(data);
}

async function deleteInspection(id) {
    let inspectionOld = await getInspection(id)
    await inspectionOld.update({ status: 'E' });
}

module.exports = {
    getInspectionsAll,
    addInspection,
    updateInspection,
    getInspection,
    deleteInspection
}
