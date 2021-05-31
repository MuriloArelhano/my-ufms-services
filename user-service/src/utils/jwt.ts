import JWT from 'jsonwebtoken'
const i = 'Nextep'
const a = 'http://nexteps.com.br'
const algorithm: JWT.Algorithm = 'RS256'

export var signOptions: JWT.SignOptions = {
    issuer: i,
    audience: a,
    subject: '',
    expiresIn: "2h",
    algorithm: algorithm
}

export var verifyOptions: JWT.VerifyOptions = {
    issuer: i,
    audience: a,
    subject: '',
    algorithms: [algorithm]
}
