const Settings = require('../models/Settings');
const logger = require('../utils/logger');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        whatsappPhoneNumber: '',
        shopifyWebhookUrl: '',
        defaultLanguage: 'en',
        messageTemplates: [],
        notificationEmail: '',
        autoRespondEnabled: false
      });
    }
    res.json(settings);
  } catch (error) {
    logger.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true
    });
    res.json(updatedSettings);
  } catch (error) {
    logger.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings' });
  }
};
