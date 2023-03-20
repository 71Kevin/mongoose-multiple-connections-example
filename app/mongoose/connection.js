const mongoose = require('mongoose');
const logger = require('../lib/logger');

function makeNewConnection(uri, name) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on('error', (error) => {
    logger.error(`MongoDB :: connection ${name} ${JSON.stringify(error)}`);
    db.close().catch(() => {
      logger.error(`MongoDB :: failed to close connection ${name}`);
    });
  });

  db.on('connected', () => {
    logger.info(`MongoDB :: connected ${name}`);
  });

  db.on('disconnected', () => {
    logger.info(`MongoDB :: disconnected ${name}`);
  });

  return db;
}

const userConnection = makeNewConnection(
  'mongodb://127.0.0.1:27017/myDB1',
  'userConnection'
);
const todoConnection = makeNewConnection(
  'mongodb://127.0.0.1:27017/myDB2',
  'todoConnection'
);

if (!userConnection || !todoConnection) {
  logger.error('Failed to connect to MongoDB');
  process.exit(1);
}

module.exports = {
  userConnection,
  todoConnection,
};
