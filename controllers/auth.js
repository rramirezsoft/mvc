const { usersModel } = require("../models");
const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')
const { handleHttpError } = require('../utils/handleError')

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false })
        const data = {
        token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_USER', 500);
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name role email")
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }
        user.set("password", undefined, {strict:false}) //Si no queremos que se muestre el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER", 500)
    }
}

module.exports = { registerCtrl, loginCtrl }