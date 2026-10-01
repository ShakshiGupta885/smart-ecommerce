const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'product-service' });
});

app.get('/api/products', (req, res) => {
    res.json([
        { id: 101, name: 'Laptop', price: 999.99 },
        { id: 102, name: 'Phone', price: 599.99 }
    ]);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));