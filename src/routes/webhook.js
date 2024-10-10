const express = require('express');
const verifySignature = require('../middleware/verifySignature');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/', verifySignature, (req, res) => {
  const { messages } = req.body;
  messages.forEach(message => {
    logger.info('Received message:', message);
    // Process incoming message (implement your logic here)
  });

  res.status(200).send('OK');
});

module.exports = router;