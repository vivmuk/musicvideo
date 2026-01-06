const express = require('express');
const router = express.Router();
const axios = require('axios');

const VENICE_BASE_URL = 'https://api.venice.ai/api/v1';

// Helper to get Venice API Key
const getApiKey = () => process.env.VENICE_API_KEY;

// POST /api/venice/chat
router.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(`${VENICE_BASE_URL}/chat/completions`, req.body, {
            headers: {
                'Authorization': `Bearer ${getApiKey()}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Venice Chat Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

// POST /api/venice/video/queue
router.post('/video/queue', async (req, res) => {
    try {
        const response = await axios.post(`${VENICE_BASE_URL}/video/queue`, req.body, {
            headers: {
                'Authorization': `Bearer ${getApiKey()}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Venice Video Queue Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

// GET /api/venice/video/retrieve/:id
router.get('/video/retrieve/:id', async (req, res) => {
    try {
        const response = await axios.post(`${VENICE_BASE_URL}/video/retrieve`, {
            queue_id: req.params.id,
            delete_media_on_completion: true
        }, {
            headers: {
                'Authorization': `Bearer ${getApiKey()}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Venice Video Retrieve Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

// POST /api/venice/video/quote
router.post('/video/quote', async (req, res) => {
    try {
        const response = await axios.post(`${VENICE_BASE_URL}/video/quote`, req.body, {
            headers: {
                'Authorization': `Bearer ${getApiKey()}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Venice Video Quote Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal Server Error' });
    }
});

module.exports = router;
