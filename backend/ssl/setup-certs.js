const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sslDir = __dirname;

// Create SSL directory if it doesn't exist
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

try {
  // Generate certificates using OpenSSL
  const opensslCommand = `openssl req -x509 -newkey rsa:4096 -keyout "${path.join(sslDir, 'private-key.pem')}" -out "${path.join(sslDir, 'certificate.pem')}" -days 365 -nodes -subj "/CN=localhost"`;
  execSync(opensslCommand);
  
  console.log('SSL certificates generated successfully!');
  console.log('Certificate:', path.join(sslDir, 'certificate.pem'));
  console.log('Private Key:', path.join(sslDir, 'private-key.pem'));
} catch (error) {
  console.error('Error generating certificates:', error.message);
  process.exit(1);
}
