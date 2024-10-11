const whatsappService = require('../services/whatsappService');
const logger = require('../utils/logger');

exports.handleOrderCreated = async (req, res) => {
  try {
    const order = req.body;
    logger.info(`New order created: ${order.id}`);
    await whatsappService.sendMessage(
      order.customer.phone,
      'order_confirmation',
      [{ type: "text", text: order.name }, { type: "text", text: order.total_price }]
    );
    res.sendStatus(200);
  } catch (error) {
    logger.error('Error handling order created webhook:', error);
    res.sendStatus(500);
  }
};

exports.handleCartUpdated = async (req, res) => {
  try {
    const cart = req.body;
    logger.info(`Cart updated: ${cart.id}`);
    if (cart.abandoned_checkout_url) {
      await whatsappService.sendMessage(
        cart.customer.phone,
        'abandoned_cart',
        [{ type: "text", text: cart.total_price }]
      );
    }
    res.sendStatus(200);
  } catch (error) {
    logger.error('Error handling cart updated webhook:', error);
    res.sendStatus(500);
  }
};