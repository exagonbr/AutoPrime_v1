const express = require('express');
const cors = require('cors');
const { verifyUserCredentials, users } = require('./users');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use env variable in production

app.use(cors());
app.use(express.json());

// In-memory data stores
let mechanics = [
  { id: '1', name: 'John Doe', specialty: 'Engine Repair', rating: 4.5, photo: '' },
  { id: '2', name: 'Jane Smith', specialty: 'Brake Specialist', rating: 4.7, photo: '' },
];

let bookings = [];
let contactMessages = [];
let helpRequests = [];
let providers = [
  { id: 'provider1', name: 'Provider One', username: 'provider1', password: 'providerpass', lat: 40.7128, lng: -74.0060 }, // New York
  { id: 'provider2', name: 'Provider Two', username: 'provider2', password: 'providerpass', lat: 34.0522, lng: -118.2437 }, // Los Angeles
  { id: 'provider3', name: 'Provider Three', username: 'provider3', password: 'providerpass', lat: 41.8781, lng: -87.6298 }, // Chicago
];

// Helper function to calculate distance between two lat/lng points in km using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// New API endpoint to get providers near a location within a radius (km)
app.get('/api/providers/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng query parameters are required' });
  }
  const searchRadius = radius ? parseFloat(radius) : 50; // default 50 km
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  const nearbyProviders = providers.filter(provider => {
    const distance = getDistanceFromLatLonInKm(userLat, userLng, provider.lat, provider.lng);
    return distance <= searchRadius;
  });

  res.json({ providers: nearbyProviders });
});

// Authentication middleware using JWT
function authenticate(req, res, next) {
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
}

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

// Routes

// Master admin: get all providers
app.get('/api/admin/providers', authenticate, (req, res) => {
  if (req.user.role !== 'master') return res.status(403).json({ error: 'Forbidden' });
  res.json(providers);
});

// Master admin: add provider
app.post('/api/admin/providers', authenticate, (req, res) => {
  if (req.user.role !== 'master') return res.status(403).json({ error: 'Forbidden' });
  const { name, username, password } = req.body;
  if (!name || !username || !password) return res.status(400).json({ error: 'Missing fields' });
  if (providers.find(p => p.username === username)) return res.status(400).json({ error: 'Username exists' });
  const newProvider = { id: `provider${providers.length + 1}`, name, username, password };
  providers.push(newProvider);
  res.status(201).json(newProvider);
});

// Provider: get help requests
app.get('/api/provider/requests', authenticate, (req, res) => {
  if (req.user.role !== 'provider') return res.status(403).json({ error: 'Forbidden' });
  // Return all pending requests
  const pendingRequests = helpRequests.filter(r => !r.assignedProviderId);
  res.json(pendingRequests);
});

// Provider: accept a help request
app.post('/api/provider/requests/:id/accept', authenticate, (req, res) => {
  if (req.user.role !== 'provider') return res.status(403).json({ error: 'Forbidden' });
  const requestId = req.params.id;
  const request = helpRequests.find(r => r.id === requestId);
  if (!request) return res.status(404).json({ error: 'Request not found' });
  if (request.assignedProviderId) return res.status(400).json({ error: 'Request already assigned' });
  request.assignedProviderId = req.user.id;
  request.status = 'accepted';
  res.json(request);
});

// Get mechanics list
app.get('/api/mechanics', (req, res) => {
  res.json(mechanics);
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const { mechanicId, date, time } = req.body;
  if (!mechanicId || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const booking = { id: String(bookings.length + 1), mechanicId, date, time };
  bookings.push(booking);
  res.status(201).json(booking);
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const contactMessage = { id: String(contactMessages.length + 1), name, email, message };
  contactMessages.push(contactMessage);
  res.status(201).json({ message: 'Contact message received' });
});

// Submit mechanic help request
app.post('/api/request-help', (req, res) => {
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
  const newRequest = {
    id: `req${helpRequests.length + 1}`,
    location,
    vehicleType,
    issueDescription,
    status: 'pending',
    assignedProviderId: null,
  };
  helpRequests.push(newRequest);
  res.status(201).json({ message: 'Mechanic help request received', request: newRequest });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
