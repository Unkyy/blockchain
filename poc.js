var http = require("http");
const crypto = require("crypto");
//const { sign } = require("node:crypto");

// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   // The standard secure default length for RSA keys is 2048 bits
//   modulusLength: 4096,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//     cipher: 'aes-256-cbc',
//     passphrase: 'top secret'
//   }
// });

const verifiableData = "t";



publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmvKg+bhngthfyUwYz4jE
aI9jbSQAPhDCvRwJ3tcxnfRpavrFa5etEhJZyI/jLQjYw1xBgJcXe1viRRJNY4e+
bJwGVJxF9gL8hisPRAQ5N3AjzLAitXX4pMzVaPOeW9jF+8dyrO1SZt6Fw7NktvtI
OmiL8hNROeZ2/ISKCnGMe+Jq5XlGuWLfr8mOaebzKEs//PAOGm2NZGSVoOOPZy7/
otnmaWXcIaLU1q3IW4EZbV5Vg/Mw9WGObcWdG6JwE27ndqLJ1UELWtgSscwPp1oJ
p6YlrozKBLPRNqGtqCvW2LdxU42q4o4IccB3BNEciW9qDTQpNknd2nRPd7vWAHjf
eDIvbJVeuadWdeTdytwrN9dNzHOi5hwvlLwaBnu+v9a+VGF8RcDW3s7O8HhFEGzT
lBsp++QoahYuSPCbHEYNXPq1ktGcEyehIvmrZ8192rDc8RLnXXxLSnhd9C0e/4Es
M6EpWPDbqse+AzeW+r8NrtpoiduGun9GKFlLb+sIiQpR0xykE6M2m+/gniNZQysD
JCTEIOwLIoKTpQte21sW2S69JSJ1vJS2j49XA7hJtyhM9vTMZzDaepPBDKO4iwaR
EXwouuhPX7FFo7Y+mmascJVK/RFqjPHmwrdkDQ/+GobckVcFiIKcg0mWIzqyIBp8
6bD+EVwfujvz/bgRIwKnWNUCAwEAAQ==
-----END PUBLIC KEY-----`
privateKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
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
-----END ENCRYPTED PRIVATE KEY-----`
const signer = crypto.createSign('RSA-SHA256');
signer.write(verifiableData)
signer.end()
sign = signer.sign({ 'key': privateKey, 'passphrase': 'top secret' }, 'base64')


console.log(sign)
// The signature method takes the data we want to sign, the
// hashing algorithm, and the padding scheme, and generates
// a signature in the form of bytes
// const signature = sign.sign("pkcs8", Buffer.from(verifiableData), {
//   key: privateKey,
//   padding: crypto.constants.RSA_PKCS1_PSS_PADDING
// });
// To verify the data, we provide the same hashing algorithm and
// padding scheme we provided to generate the signature, along
// with the signature itself, the data that we want to
// verify against the signature, and the public key
const isVerified = crypto.verify('RSA-SHA256',Buffer.from(verifiableData, 'utf8'),publicKey,Buffer.from(sign, 'base64'))

console.log(isVerified)