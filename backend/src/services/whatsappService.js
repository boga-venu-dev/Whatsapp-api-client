const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const Message = require('../models/message');

const WHATSAPP_API_URL = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;

async function sendMessage(to, templateName, templateData) {
  try {
    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: { 
        name: templateName, 
        language: { code: "en_US" },
        components: templateData
      }
    }, {
      headers: {
        'Authorization': `Bearer ${config.whatsapp.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    await Message.create({
      to,
      templateName,
      templateData,
      status: 'sent',
      whatsappMessageId: response.data.messages[0].id
    });

    logger.info(`Message ${templateName} sent to ${to}`);
    return response.data;
  } catch (error) {
    logger.error(`Error sending WhatsApp message to ${to}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getMessageTemplates() {
  try {
    const response = await axios.get(`https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.businessAccountId}/message_templates`, {
      headers: {
        'Authorization': `Bearer ${config.whatsapp.accessToken}`,
      }
    });
    return response.data.data;
  } catch (error) {
    logger.error('Error fetching message templates:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {
  sendMessage,
  getMessageTemplates,
};