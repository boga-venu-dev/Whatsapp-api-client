const whatsappService = require('../services/whatsappService');
const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  try {
    const { to, templateName, templateData } = req.body;
    const result = await whatsappService.sendMessage(to, templateName, templateData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageTemplates = async (req, res) => {
  try {
    const templates = await whatsappService.getMessageTemplates();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};