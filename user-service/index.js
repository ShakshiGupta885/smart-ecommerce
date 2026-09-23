const express = require('express');
const app = express();
app.use(express.json());

// Health check endpoint (used later by Kubernetes)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'user-service' });
});

// Main endpoint
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));