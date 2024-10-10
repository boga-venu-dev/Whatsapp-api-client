const crypto = require('crypto');
const config = require('../config');

function verifySignature(req, res, next) {
  const signature = req.get('X-Hub-Signature-256');
  const bodyString = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', config.webhook.secret)
    .update(bodyString)
    .digest('hex');

  if (signature !== `sha256=${expectedSignature}`) {
    return res.status(403).send('Invalid signature');
  }

  next();
}

module.exports = verifySignature;