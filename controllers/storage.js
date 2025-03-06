const {storageModel} = require('../models');
const fs = require('fs');
const  uploadToPinata  = require('../utils/handleUploadIPFS');

const createItem = async (req, res) => {
    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;
    const pinataResponse = await uploadToPinata(fileBuffer, fileName);
    const ipfsFile = pinataResponse.IpfsHash;
    const ipfsUrl = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`;
    const fileData = {
        filename: fileName,
        url: ipfsUrl
    }
    const data = await storageModel.create(fileData);
    res.send(data);
}

const getItems = async (req, res) => {
    const data = await storageModel.find({});
    res.send(data);
}

module.exports = {
    createItem,
    getItems
}