const express = require('express');
const routes = require('./routes');
const healthCheckService = require('./services/healthCheckService');
const { PORT } = require('./config/constants');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `Route ${req.originalUrl} does not exist`
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Health Check Service running on port ${PORT}`);
    console.log(`📊 Health endpoint: http://localhost:${PORT}/api/health`);
    
    // Start periodic health checks
    healthCheckService.startPeriodicChecks();
});