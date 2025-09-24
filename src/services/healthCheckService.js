const axios = require('axios');
const MONITORED_ENDPOINTS = require('../config/endpoints');
const { TIMEOUT, CHECK_INTERVAL } = require('../config/constants'); 

class HealthCheckService {
    constructor() {
        this.healthData = new Map();
        this.initializeHealthData();
    }

    initializeHealthData() {
        MONITORED_ENDPOINTS.forEach(endpoint => {
            this.healthData.set(endpoint.name, {
                status: 'unknown',
                statusCode: null,
                responseTime: null,
                lastChecked: null,
                error: null,
                uptime: 0,
                totalChecks: 0
            });
        });
    }

    async checkEndpoint(endpointConfig) {
        const startTime = Date.now();
        
        try {
            const response = await axios.get(endpointConfig.url, { 
                timeout: endpointConfig.timeout || TIMEOUT 
            });
            
            const responseTime = Date.now() - startTime;
            const isHealthy = response.status === endpointConfig.expectedStatus;
            
            return {
                status: isHealthy ? 'up' : 'down',
                statusCode: response.status,
                responseTime: responseTime,
                lastChecked: new Date().toISOString(),
                error: isHealthy ? null : `Expected status ${endpointConfig.expectedStatus}, got ${response.status}`
            };
            
        } catch (error) {
            const responseTime = Date.now() - startTime;
            
            return {
                status: 'down',
                statusCode: error.response?.status || 'timeout',
                responseTime: responseTime,
                lastChecked: new Date().toISOString(),
                error: error.message
            };
        }
    }

    async checkAllEndpoints() {
        const checkPromises = MONITORED_ENDPOINTS.map(async (endpoint) => {
            const result = await this.checkEndpoint(endpoint);
            const currentData = this.healthData.get(endpoint.name);
            
            // Update metrics
            this.healthData.set(endpoint.name, {
                ...result,
                uptime: result.status === 'up' ? currentData.uptime + 1 : currentData.uptime,
                totalChecks: currentData.totalChecks + 1,
                uptimePercentage: currentData.totalChecks > 0 
                    ? Math.round((currentData.uptime / currentData.totalChecks) * 100) 
                    : 0
            });
        });
        
        await Promise.allSettled(checkPromises);
    }

    getHealthStatus() {
        const services = {};
        let allUp = true;
        
        for (const [name, data] of this.healthData) {
            services[name] = data;
            if (data.status !== 'up') allUp = false;
        }
        
        return {
            overallStatus: allUp ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            services
        };
    }

    startPeriodicChecks() {
        // Initial check
        this.checkAllEndpoints();
        
        // Set up periodic checks - FIXED: using CHECK_INTERVAL constant
        setInterval(() => {
            this.checkAllEndpoints();
        }, CHECK_INTERVAL);
    }
}

module.exports = new HealthCheckService();