const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.post('/order-created', webhookController.handleOrderCreated);
router.post('/cart-updated', webhookController.handleCartUpdated);

module.exports = router;