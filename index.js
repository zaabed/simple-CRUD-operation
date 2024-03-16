// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample hardcoded data
let users = [];

// Routes
// Create a user
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Read a user by username
app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const foundUser = users.find(user => user.username === username);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update a user
app.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  const foundIndex = users.findIndex(user => user.username === username);
  if (foundIndex !== -1) {
    users[foundIndex].password = password;
    res.json(users[foundIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a user
app.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const foundIndex = users.findIndex(user => user.username === username);
  if (foundIndex !== -1) {
    const deletedUser = users.splice(foundIndex, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

