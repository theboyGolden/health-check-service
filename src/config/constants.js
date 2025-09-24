module.exports = {
    CHECK_INTERVAL: 30000, // 30 seconds
    TIMEOUT: 5000,
    PORT: process.env.PORT || 3000,
    HEALTH_STATUS: {
        UP: 'up',
        DOWN: 'down',
        UNKNOWN: 'unknown',
        HEALTHY: 'healthy',
        DEGRADED: 'degraded'
    }
};