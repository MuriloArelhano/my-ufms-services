const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const WebRequestError = require('http-errors')

const i = 'Nextep'
const a = 'http://nexteps.com.br'
const algorithm = 'RS256'

exports.validateJWT = (req, res, next) => {
    const usrJwtToken = req.cookies.usrJwtToken || req.body.usrJwtToken || req.get('Authorization') || req.query.usrJwtToken
    const verifyOptions = {
        issuer: i,
        audience: a,
        subject: '',
        algorithms: [algorithm]
    }
    try {
        var publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'public.key'));
        JWT.verify(usrJwtToken, publicKey, verifyOptions, (err, decoded) => {
            if (err) {
                throw new WebRequestError(400, "Token invalido ou expirado")
            }
            req.body.jwtUserId = decoded.userId
            next()
        })

    } catch (error) {
        next(error)
    }
}