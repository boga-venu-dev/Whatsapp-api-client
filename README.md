# WhatsApp Notification App for Shopify

This application integrates with Shopify to send WhatsApp notifications for various events such as order confirmations, abandoned carts, and delivery updates. It's designed to run alongside an existing order tracking application.

## Features

- Send WhatsApp notifications for:
  - Order confirmations
  - Abandoned cart reminders
  - Order status updates
  - Delivery notifications
- Integration with Shopify API
- Rate limiting to prevent API abuse
- Logging for monitoring and debugging
- In-memory message queue for efficient message handling

## Prerequisites

- Node.js (version 14.x or later)
- npm (comes with Node.js)
- A Shopify store with API access
- WhatsApp Business API access
- Nginx web server (for production deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whatsapp-notification-app.git
   cd whatsapp-notification-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   WHATSAPP_API_PORT=3001
   LOG_LEVEL=info
   LOG_DIR=/var/log/whatsapp-api
   SHOPIFY_API_KEY=your_shopify_api_key
   SHOPIFY_API_SECRET=your_shopify_api_secret
   WHATSAPP_API_TOKEN=your_whatsapp_api_token
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Project Structure

```
whatsapp-notification-app/
│
├── src/
│   ├── middleware/
│   │   └── rateLimiter.js
│   ├── routes/
│   │   ├── webhook.js
│   │   └── send.js
│   ├── services/
│   │   ├── shopify.js
│   │   └── whatsapp.js
│   └── utils/
│       └── logger.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Configuration

- `WHATSAPP_API_PORT`: The port on which the app will run (default: 3001)
- `LOG_LEVEL`: Logging level (e.g., 'info', 'error')
- `LOG_DIR`: Directory for storing log files
- `SHOPIFY_API_KEY`: Your Shopify API key
- `SHOPIFY_API_SECRET`: Your Shopify API secret
- `WHATSAPP_API_TOKEN`: Your WhatsApp Business API token

## API Endpoints

- `/webhook`: Receives webhooks from Shopify
- `/send`: Endpoint to manually trigger message sending

## Deployment

1. Set up a server with Node.js and Nginx installed.
2. Clone the repository to your server.
3. Install dependencies: `npm install --production`
4. Set up environment variables in a `.env` file.
5. Configure Nginx to proxy requests to the application (see Nginx configuration section).
6. Use PM2 to manage the Node.js process:
   ```bash
   npm install -g pm2
   pm2 start server.js --name whatsapp-api
   pm2 save
   pm2 startup
   ```

## Nginx Configuration

Add the following to your Nginx configuration:

```nginx
location /whatsapp-api {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Logging

Logs are stored in the directory specified by `LOG_DIR`. You can view logs using:
```bash
tail -f /var/log/whatsapp-api/combined.log
```

## Troubleshooting

### Permission Issues
If you encounter permission issues, you can either:

1. Ensure the application has write access to the log directory:
   ```bash
   sudo chown -R yourusername:yourusername /var/log/whatsapp-api
   sudo chmod 755 /var/log/whatsapp-api
   ```

2. Or, run the application with sudo permissions (not recommended for production):
   ```bash
   sudo npm start
   ```

### Other Issues
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Ensure all required environment variables are set correctly.
- If using PM2, check PM2 logs: `pm2 logs whatsapp-api`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
