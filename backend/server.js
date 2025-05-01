const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory data stores
let mechanics = [
  { id: '1', name: 'John Doe', specialty: 'Engine Repair', rating: 4.5, photo: '' },
  { id: '2', name: 'Jane Smith', specialty: 'Brake Specialist', rating: 4.7, photo: '' },
];

let bookings = [];
let contactMessages = [];

// Routes

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
  if (!location || !vehicleType || !issueDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // For simplicity, just acknowledge receipt
  res.status(201).json({ message: 'Mechanic help request received' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
