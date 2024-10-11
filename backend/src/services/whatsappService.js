const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const Message = require('../models/message');
const Settings = require('../models/Settings');

async function sendMessage(to, templateName, templateData) {
  try {
    const settings = await Settings.findOne();
    const WHATSAPP_API_URL = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${settings.whatsappPhoneNumber}/messages`;

    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: { 
        name: templateName, 
        language: { code: settings.defaultLanguage },
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
    const settings = await Settings.findOne();
    return settings.messageTemplates;
  } catch (error) {
    logger.error('Error fetching message templates:', error);
    throw error;
  }
}

module.exports = {
  sendMessage,
  getMessageTemplates,
};
