const i = 'Nextep'
const a = 'http://nexteps.com.br'
const algorithm = 'RS256'

exports.verifyOptions = {
    issuer: i,
    audience: a,
    subject: '',
    algorithms: [algorithm]
}