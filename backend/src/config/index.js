require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3002, // Use a different port than your tracking app
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/whatsapp-api',
  shopify: {
    shopName: process.env.SHOPIFY_SHOP_NAME,
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
  },
  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    apiVersion: 'v13.0',
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  baseUrl: '/whatsapp', // Subpath for the app
};