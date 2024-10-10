require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rateLimiter = require('./src/middleware/rateLimiter');
const webhookRoutes = require('./src/routes/webhook');
const sendRoutes = require('./src/routes/send');
const logger = require('./src/utils/logger');

const app = express();

app.use(bodyParser.json());
app.use(rateLimiter);

app.use('/webhook', webhookRoutes);
app.use('/send', sendRoutes);

const PORT = process.env.WHATSAPP_API_PORT || 3001;

app.listen(PORT, '127.0.0.1', () => {
  logger.info(`WhatsApp API client running on port ${PORT}`);
}).on('error', (err) => {
  logger.error('An error occurred while starting the server:', err);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});