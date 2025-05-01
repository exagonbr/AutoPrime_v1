const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sslDir = __dirname;

// Ensure the ssl directory exists
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

// Generate private key and certificate using OpenSSL
try {
  // Generate private key
  execSync('openssl genrsa -out private-key.pem 2048', { cwd: sslDir });
  console.log('Generated private key');

  // Generate CSR configuration
  const csrConf = `
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
C = BR
ST = Sao Paulo
L = Sao Paulo
O = AutoPrime Development
OU = Development
CN = localhost

[v3_req]
subjectAltName = @alt_names
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
`;

  fs.writeFileSync(path.join(sslDir, 'csr.conf'), csrConf);

  // Generate CSR and self-signed certificate
  execSync('openssl req -new -key private-key.pem -out certificate.csr -config csr.conf', { cwd: sslDir });
  execSync('openssl x509 -req -days 365 -in certificate.csr -signkey private-key.pem -out certificate.pem -extensions v3_req -extfile csr.conf', { cwd: sslDir });
  
  // Clean up CSR file
  fs.unlinkSync(path.join(sslDir, 'certificate.csr'));
  fs.unlinkSync(path.join(sslDir, 'csr.conf'));

  console.log('SSL certificates generated successfully!');
  console.log('Certificate:', path.join(sslDir, 'certificate.pem'));
  console.log('Private Key:', path.join(sslDir, 'private-key.pem'));
} catch (error) {
  console.error('Error generating certificates:', error.message);
  process.exit(1);
}
