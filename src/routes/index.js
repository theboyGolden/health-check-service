const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');

// Main routes
router.get('/', (req, res) => {
    res.json({
        message: 'Health Check Service API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            healthSummary: '/health/summary'
        }
    });
});

// Mount health routes
router.use('/health', healthRoutes);

module.exports = router;