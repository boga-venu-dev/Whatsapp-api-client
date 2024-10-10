const express = require('express');
const { queueMessage } = require('../services/queue');
const { scheduleReviewRequest } = require('../services/whatsapp');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, templateName, templateData } = req.body;
  try {
    await queueMessage(to, templateName, templateData);
    res.status(200).send('Message queued for sending');
  } catch (error) {
    logger.error('Error queueing message:', error);
    res.status(500).send('Error queueing message');
  }
});

router.post('/schedule-review', async (req, res) => {
  const { to, orderNumber, products, delayDays } = req.body;
  try {
    scheduleReviewRequest(to, orderNumber, products, delayDays);
    res.status(200).send('Review request scheduled');
  } catch (error) {
    logger.error('Error scheduling review request:', error);
    res.status(500).send('Error scheduling review request');
  }
});

module.exports = router;