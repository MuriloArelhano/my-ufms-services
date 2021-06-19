const JWT = require('jsonwebtoken')
const verifyOptions = require('../utils/jwt')
const path = require('path')
const fs = require('fs')
const WebRequestError = require('http-errors')

exports.validateJWT = (req, res, next) => {
    const { usrJwtToken } = Object.assign({}, req.cookies || req.body || req.get('Authorization') || req.query)
    console.log(usrJwtToken)
    try {
        var publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'public.key'));
        JWT.verify(usrJwtToken, publicKey, verifyOptions, (err, decoded) => {
            if (err) {
                throw new WebRequestError(500, "Token invalido ou expirado")
            }
            req.body.jwtUserId = decoded.userId
            next()
        })

    } catch (error) {
        next(error)
    }
}