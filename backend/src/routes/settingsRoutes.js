const express = require('express');
const settingsController = require('../controllers/settingsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, settingsController.getSettings);
router.put('/', auth, settingsController.updateSettings);

module.exports = router;
