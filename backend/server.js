const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { verifyUserCredentials } = require('./users');

const app = express();
const PORT = process.env.PORT || 5000;

// SSL configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'private-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
  requestCert: false,
  rejectUnauthorized: false // Accept self-signed certificates
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true
}));

// JWT secret key
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await verifyUserCredentials(username, password);
    if (user) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token, role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Create HTTPS server
const server = https.createServer(sslOptions, app);

server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
