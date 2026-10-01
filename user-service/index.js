const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'user-service', version: 'v2' });
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', version: 'v2' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'customer', version: 'v2' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'customer', version: 'v2' }
    ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User Service v2 running on port ${PORT}`));