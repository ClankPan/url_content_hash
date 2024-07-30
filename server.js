import express from 'express';
import fetch from 'node-fetch';
import { createHash } from 'crypto';
const app = express();

app.get('/hash', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send({ error: 'URL parameter is required' });
    }
    try {
        const response = await fetch(url);
        const data = await response.text();
        const hash = createHash('sha256').update(data).digest('hex');
        res.send({ hash });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch the URL' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
