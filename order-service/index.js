const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'order-service' });
});

app.get('/api/orders', (req, res) => {
    res.json([
        { id: 1001, userId: 1, productId: 101, qty: 2, status: 'shipped' },
        { id: 1002, userId: 2, productId: 102, qty: 1, status: 'pending' }
    ]);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));