const messageTemplates = {
  abandonedCart: (customerName, cartItems, cartTotal, checkoutLink) => `
Hello ${customerName}! 👋

We noticed you left some items in your cart:
${cartItems.map(item => `• ${item.name} - ${item.price}`).join('\n')}

Total: ${cartTotal}

Ready to complete your purchase? Click here to checkout:
${checkoutLink}

Need help? Reply to this message and we'll assist you!
  `,

  orderConfirmation: (orderNumber, orderTotal) => `
Thank you for your order! 🎉

Order #${orderNumber} has been confirmed.
Total: ${orderTotal}

We'll process your order soon and notify you when it's shipped.

Questions? Reply to this message for assistance.
  `,

  shipmentNotification: (orderNumber, trackingNumber, carrierName, trackingLink) => `
Great news! Your order is on its way! 🚚

Order #${orderNumber} has been shipped via ${carrierName}.

Tracking number: ${trackingNumber}

Track your package here:
${trackingLink}

Thanks for choosing us!
  `,

  deliveryConfirmation: (orderNumber) => `
Your order has been delivered! 📦

Order #${orderNumber} has been successfully delivered.

We hope you love your purchase!

If you have any issues or questions, please reply to this message.

Thank you for shopping with us!
  `,

  welcomeMessage: (customerName) => `
Welcome to our store, ${customerName}! 🎊

We're excited to have you join our community of happy shoppers.

Here's what you can expect from us:
• Exclusive deals and promotions
• New product announcements
• Order updates via WhatsApp

Have any questions? Feel free to ask!

Happy shopping! 🛍️
  `,

  recentPurchaseReview: (customerName, orderNumber, productReviews) => `
Hello ${customerName}! 👋

We hope you're enjoying your recent purchase (Order #${orderNumber}).

We'd love to hear your thoughts! Please consider leaving a review for the product(s) you bought:

${productReviews.map(product => `
• ${product.name}
  Leave a review: ${product.reviewLink}`).join('\n')}

Your feedback helps other customers and helps us improve our products and services.

Thank you for your time!
  `,

  backInStock: (productName, productLink) => `
It's back! 🎉

Good news! The item you were interested in is back in stock:

${productName}

Don't miss out this time! Click here to view the product:
${productLink}

Act fast before it's gone again!
  `,

  promotionalOffer: (offerDetails, promoCode, expiryDate) => `
Special offer just for you! 🎁

${offerDetails}

Use promo code: ${promoCode}

Hurry! This offer expires on ${expiryDate}.

Shop now and save!
  `
};

module.exports = messageTemplates;