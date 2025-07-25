const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/recommend/:title', async (req, res) => {
    try{
        const { title } = req.params;

        // Call Flask API to get recommendations
        const pythonApiUrl = `http://127.0.0.1:5000/recommend?movie=${encodeURIComponent(title)}`;
        const response = await axios.get(pythonApiUrl);

        // Send the recommendations back to the client
        res.json(response.data);
    }
    catch (error) {
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : {error: 'Internal Server Error'};
        res.status(status).json({ message});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on :${PORT}`);
});