const logger = require('../utils/logger');

class MessageQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(message) {
    this.queue.push(message);
    logger.info('Message added to queue', { messageId: message.id });
  }

  dequeue() {
    if (this.queue.length === 0) {
      return null;
    }
    const message = this.queue.shift();
    logger.info('Message removed from queue', { messageId: message.id });
    return message;
  }

  get length() {
    return this.queue.length;
  }
}

module.exports = new MessageQueue();