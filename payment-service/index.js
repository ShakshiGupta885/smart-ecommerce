const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'payment-service' });
});

app.get('/api/payments', (req, res) => {
    res.json([
        { id: 5001, orderId: 1001, amount: 1999.98, status: 'completed' },
        { id: 5002, orderId: 1002, amount: 599.99, status: 'processing' }
    ]);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));