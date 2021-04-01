var http = require("http");
const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
});

const verifiableData = "this need to be verified";



console.log(publicKey)
console.log(privateKey)
const signer = crypto.createSign('RSA-SHA256');
signer.write(verifiableData)
signer.end()
sign = signer.sign({ 'key': privateKey, 'passphrase': 'top secret deeeded' }, 'base64')

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