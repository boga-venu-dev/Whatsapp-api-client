const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const messageRoutes = require('./routes/messageRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Use the subpath for all routes
app.use(`${config.baseUrl}/api/messages`, messageRoutes);
app.use(`${config.baseUrl}/api/webhook`, webhookRoutes);
app.use(`${config.baseUrl}/api/dashboard`, dashboardRoutes);
app.use(`${config.baseUrl}/api/settings`, settingsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
