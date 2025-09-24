const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getHealth);
router.get('/summary', healthController.getHealthSummary);

module.exports = router;