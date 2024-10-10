require('dotenv').config();

module.exports = {
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL,
    apiToken: process.env.WHATSAPP_API_TOKEN,
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  env: process.env.NODE_ENV || 'development',
};