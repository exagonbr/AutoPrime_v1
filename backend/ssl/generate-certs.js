const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

// Generate a key pair
const keys = forge.pki.rsa.generateKeyPair(2048);

// Create a certificate
const cert = forge.pki.createCertificate();

// Set certificate fields
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [{
  name: 'commonName',
  value: 'localhost'
}, {
  name: 'countryName',
  value: 'BR'
}, {
  shortName: 'ST',
  value: 'São Paulo'
}, {
  name: 'localityName',
  value: 'São Paulo'
}, {
  name: 'organizationName',
  value: 'AutoPrime Development'
}, {
  shortName: 'OU',
  value: 'Development'
}];

cert.setSubject(attrs);
cert.setIssuer(attrs);

// Set extensions
cert.setExtensions([{
  name: 'basicConstraints',
  cA: true
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}, {
  name: 'extKeyUsage',
  serverAuth: true,
  clientAuth: true
}, {
  name: 'subjectAltName',
  altNames: [{
    type: 2, // DNS
    value: 'localhost'
  }, {
    type: 7, // IP
    ip: '127.0.0.1'
  }]
}]);

// Self-sign the certificate
cert.sign(keys.privateKey, forge.md.sha256.create());

// Convert to PEM format
const certPem = forge.pki.certificateToPem(cert);
const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);

// Save the files
const sslDir = __dirname;
fs.writeFileSync(path.join(sslDir, 'certificate.pem'), certPem);
fs.writeFileSync(path.join(sslDir, 'private-key.pem'), privateKeyPem);

console.log('SSL certificates generated successfully!');
console.log('Certificate:', path.join(sslDir, 'certificate.pem'));
console.log('Private Key:', path.join(sslDir, 'private-key.pem'));
