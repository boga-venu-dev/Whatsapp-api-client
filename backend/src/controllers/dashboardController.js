const Message = require('../models/message');
const shopifyService = require('../services/shopifyService');

exports.getDashboardStats = async (req, res) => {
  try {
    const messageCount = await Message.countDocuments();
    const recentOrders = await shopifyService.getRecentOrders();
    const abandonedCarts = await shopifyService.getAbandonedCarts();

    res.json({
      messagesSent: messageCount,
      recentOrders: recentOrders.length,
      abandonedCarts: abandonedCarts.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};