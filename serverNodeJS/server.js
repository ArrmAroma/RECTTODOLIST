const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());


app.get('/api', (req, res) => {
    const q = req.query.data;
    if (q !== undefined) {
        return res.json([{ data: q, status: 'success' }]);
    }

    return res.json([{ data: null, status: 'no-data' }]);
});


app.listen(port, () => {
console.log(`API server running on http://localhost:${port}`);
});