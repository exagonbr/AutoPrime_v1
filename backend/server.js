const express = require('express');
const cors = require('cors');
const { verifyUserCredentials, users } = require('./users');
const jwt = require('jsonwebtoken');
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
app.use(express.json());

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
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await verifyUserCredentials(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
