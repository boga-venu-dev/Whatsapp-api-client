const Shopify = require('shopify-api-node');
const config = require('../config');
const logger = require('../utils/logger');

const shopify = new Shopify({
  shopName: config.shopify.shopName,
  apiKey: config.shopify.apiKey,
  password: config.shopify.apiSecret
});

exports.getRecentOrders = async (limit = 10) => {
  try {
    return await shopify.order.list({ limit: limit, status: 'any' });
  } catch (error) {
    logger.error('Error fetching recent orders:', error);
    throw error;
  }
};

exports.getAbandonedCarts = async (limit = 10) => {
  try {
    return await shopify.checkout.list({ limit: limit, status: 'open' });
  } catch (error) {
    logger.error('Error fetching abandoned carts:', error);
    throw error;
  }
};