const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Banking API v1.0');
});

app.post('/transaction', (req, res) => {
    const { amount, userId } = req.body;
    res.json({ message: `Transaction of ${amount} for user ${userId} processed` });
});

app.listen(3000, () => {
    console.log('Banking API running on port 3000');
});