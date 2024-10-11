const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true
  },
  templateName: {
    type: String,
    required: true
  },
  templateData: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed'],
    default: 'sent'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);