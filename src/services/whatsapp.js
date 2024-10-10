const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const messageTemplates = require('../templates/messageTemplates');

async function sendMessage(to, templateName, templateData) {
  try {
    if (!messageTemplates[templateName]) {
      throw new Error(`Template "${templateName}" not found`);
    }
    
    const message = messageTemplates[templateName](...templateData);
    
    const response = await axios.post(config.whatsapp.apiUrl, {
      to,
      message
    }, {
      headers: {
        'Authorization': `Bearer ${config.whatsapp.apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    logger.info('Message sent:', response.data);
    return response.data;
  } catch (error) {
    logger.error('Error sending message:', error);
    throw error;
  }
}

async function scheduleReviewRequest(to, orderNumber, products, delayDays = 7) {
  const delay = delayDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  setTimeout(async () => {
    try {
      const productReviews = products.map(product => ({
        name: product.name,
        reviewLink: `${config.shopify.storeUrl}/products/${product.handle}#write-a-review`
      }));
      
      await sendMessage(to, 'recentPurchaseReview', [to, orderNumber, productReviews]);
      logger.info(`Review request sent for order ${orderNumber}`);
    } catch (error) {
      logger.error(`Error sending review request for order ${orderNumber}:`, error);
    }
  }, delay);
}

module.exports = { sendMessage, scheduleReviewRequest };