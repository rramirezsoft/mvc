/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const { tracksModel } = require('../models')

const getItems = async (req, res) => {
    const data = await tracksModel.find({})
    res.send(data)
}


// const getItem = (req, res) => {
//     const id = req.params.id;
//     var dato = data[id]
//     res.send({ dato })
// }
const createItem = async (req, res) => {
    const { body } = req
    //console.log(body)
    const data = await
        tracksModel.create(body)
    res.send(data)
}
// const updateItem = (req, res) => {... }
// const deleteItem = (req, res) => {... }
module.exports = {
    getItems,
    createItem,
    // updateItem,
    // deleteItem
};