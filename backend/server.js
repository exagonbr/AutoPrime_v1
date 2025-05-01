const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
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
=======
const knex = require('knex');
const adminAuth = require('./middleware/adminAuth');
const adminRoutes = require('./routes/admin');
const knexConfig = require('./knexfile');

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Database setup
const db = knex(knexConfig.development);

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
>>>>>>> b4c6797 (Authentication)
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true
}));

<<<<<<< HEAD
// JWT secret key
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Login endpoint
=======
// Add database instance to request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Login route
>>>>>>> b4c6797 (Authentication)
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

<<<<<<< HEAD
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
=======
// Admin routes
app.use('/api/admin', adminAuth, adminRoutes);

// Protected routes
app.get('/api/mechanics', async (req, res) => {
  try {
    const mechanics = await db('service_providers')
      .where('is_active', true)
      .select('id', 'name', 'specialties', 'rating', 'photo');
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mechanics' });
  }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
  const { mechanicId, date, time } = req.body;
  if (!mechanicId || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const [booking] = await db('service_transactions')
      .insert({
        provider_id: mechanicId,
        service_details: JSON.stringify({ date, time }),
        status: 'pending'
      })
      .returning('*');
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await db('contact_messages').insert({ name, email, message });
    res.status(201).json({ message: 'Contact message received' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving contact message' });
  }
});

// Submit mechanic help request
app.post('/api/request-help', async (req, res) => {
  const { location, vehicleType, issueDescription } = req.body;
  if (
    !location ||
    typeof location.lat !== 'number' ||
    typeof location.lng !== 'number' ||
    !vehicleType ||
    !issueDescription
  ) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }
  try {
    const [request] = await db('service_transactions').insert({
      service_details: JSON.stringify({
        location,
        vehicleType,
        issueDescription
      }),
      status: 'pending'
    }).returning('*');
    res.status(201).json({ message: 'Help request received', request });
  } catch (error) {
    res.status(500).json({ error: 'Error creating help request' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
>>>>>>> b4c6797 (Authentication)

server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
