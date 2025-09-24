const healthCheckService = require('../services/healthCheckService');

const healthController = {
    getHealth: async (req, res) => {
        try {
            const healthStatus = healthCheckService.getHealthStatus();
            res.json(healthStatus);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to retrieve health status',
                message: error.message
            });
        }
    },
    
    getHealthSummary: (req, res) => {
        try {
            const healthStatus = healthCheckService.getHealthStatus();
            const summary = {
                status: healthStatus.overallStatus,
                timestamp: healthStatus.timestamp,
                totalServices: Object.keys(healthStatus.services).length,
                upServices: Object.values(healthStatus.services).filter(s => s.status === 'up').length
            };
            res.json(summary);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = healthController;