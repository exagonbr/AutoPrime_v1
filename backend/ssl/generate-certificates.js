const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const attrs = [
  { name: 'commonName', value: 'localhost' },
  { name: 'countryName', value: 'BR' },
  { name: 'stateOrProvinceName', value: 'São Paulo' },
  { name: 'localityName', value: 'São Paulo' },
  { name: 'organizationName', value: 'AutoPrime Development' },
  { name: 'organizationalUnitName', value: 'Development' }
];

const pems = selfsigned.generate(null, {
  keySize: 2048,
  algorithm: 'sha256',
  days: 365,
  keySize: 2048,
  extensions: [{
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
      type: 2,
      value: 'localhost'
    }, {
      type: 7,
      ip: '127.0.0.1'
    }]
  }]
});

const sslDir = __dirname;

// Write certificate in PEM format
fs.writeFileSync(path.join(sslDir, 'certificate.pem'), pems.cert);
console.log('Certificate saved to:', path.join(sslDir, 'certificate.pem'));

// Write private key in PEM format
fs.writeFileSync(path.join(sslDir, 'private-key.pem'), pems.private);
console.log('Private key saved to:', path.join(sslDir, 'private-key.pem'));

console.log('SSL certificates generated successfully!');
