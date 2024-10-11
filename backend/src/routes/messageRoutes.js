const express = require('express');
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/send', auth, messageController.sendMessage);
router.get('/history', auth, messageController.getMessageHistory);
router.get('/templates', auth, messageController.getMessageTemplates);

module.exports = router;