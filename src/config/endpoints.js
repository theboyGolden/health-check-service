// Configuration for monitored endpoints
const MONITORED_ENDPOINTS = [
    {
        name: 'user-service',
        url: 'https://httpstat.us/200',
        timeout: 5000,
        expectedStatus: 200
    },
    {
        name: 'payment-service', 
        url: 'https://httpstat.us/404',
        timeout: 5000,
        expectedStatus: 200
    },
    {
        name: 'auth-service',
        url: 'https://httpstat.us/500',
        timeout: 5000,
        expectedStatus: 200
    },
    {
        name: 'geta-solutions-api',
        url: 'https://api.geta-solutions.com',
        timeout: 10000,
        expectedStatus: 200
    },
    {
        name: 'news-service',
        url: 'https://api.geta-solutions.com/news/retrieveNews',
        timeout: 15000,  // 15 seconds timeout
        expectedStatus: 200
    },
    {
        name: 'podcast-service', 
        url: 'https://api.geta-solutions.com/podcast/retrievePodcasts',
        timeout: 15000,
        expectedStatus: 200
    },
];

module.exports = MONITORED_ENDPOINTS;