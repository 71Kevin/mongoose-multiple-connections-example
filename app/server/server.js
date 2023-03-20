const express = require('express');
const logger = require('../lib/logger');
const router = require('./router');

class Server {
  constructor(port) {
    if (!port || typeof port !== 'number' || port <= 0 || port > 65535) {
      throw new Error('Invalid port number');
    }
    this.port = port;
    this.app = express();
  }

  middlewares() {
    this.app.use(express.json({ limit: '200MB' }));
  }

  routes() {
    this.app.use(router);
  }

  listen() {
    this.app
      .listen(this.port, () =>
        logger.info(
          `mongoose-multiple-connections-example initialized on port: ${this.port}`
        )
      )
      .on('error', (err) => {
        logger.error(`Server failed to start: ${err.message}`);
        process.exit(1);
      });
  }

  bootstrap() {
    try {
      this.middlewares();
      this.routes();
      this.listen();
    } catch (err) {
      logger.error(`Failed to bootstrap server: ${err.message}`);
      process.exit(1);
    }
  }
}

const port = parseInt(process.env.APP_PORT);
if (isNaN(port)) {
  logger.error('APP_PORT environment variable not set');
  process.exit(1);
}

module.exports = new Server(port);
