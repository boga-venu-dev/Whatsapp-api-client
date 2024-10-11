const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  whatsappPhoneNumber: {
    type: String,
    required: true
  },
  shopifyWebhookUrl: {
    type: String,
    required: true
  },
  defaultLanguage: {
    type: String,
    default: 'en'
  },
  messageTemplates: [{
    name: String,
    content: String
  }],
  notificationEmail: {
    type: String,
    required: true
  },
  autoRespondEnabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
