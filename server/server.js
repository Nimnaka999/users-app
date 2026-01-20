const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// Load users from file
let users = [];
let nextId = 1;

function loadUsers() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      users = JSON.parse(data);
      if (users.length > 0) {
        nextId = Math.max(...users.map(u => u.id)) + 1;
      }
    }
  } catch (error) {
    console.error('Error loading users:', error);
    users = [];
  }
}

function saveUsers() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

// Load users on server start
loadUsers();
console.log(`Loaded ${users.length} users from storage`);

// GET /api/users - Returns a list of users
app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get a single user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users - Creates a new user
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Trim and normalize email (lowercase for case-insensitive comparison)
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Check if email already exists (case-insensitive)
    const emailExists = users.some(user => user.email && user.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const newUser = {
      id: nextId++,
      name: trimmedName,
      email: normalizedEmail,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
});

// PUT /api/users/:id - Update a user
app.put('/api/users/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Trim and normalize email
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Check if email already exists for another user
    const emailExists = users.some(user => user.id !== id && user.email && user.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      name: trimmedName,
      email: normalizedEmail,
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;
    saveUsers();
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

// DELETE /api/users/:id - Delete a user
app.delete('/api/users/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    saveUsers();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    usersCount: users.length,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Data stored in: ${DATA_FILE}`);
});
