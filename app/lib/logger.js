const winston = require('winston');
const graylog = require('graygelf')({
  host: process.env.GRAYLOG_HOST,
  port: process.env.GRAYLOG_PORT,
});

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.printf((info) => {
    const ts = new Date().toLocaleString('en-US', {
      timeZone: 'America/Sao_Paulo',
    });
    return `${ts} [${info.level}]: ${info.message}`;
  })
);

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: customFormat,
    }),
  ],
});

graylog.fields.facility = 'mongoose-multiple-connections-example';

const logger = {
  error: (message, ...args) => {
    logger.graylog(message, args);
    winstonLogger.error(message);
  },
  warn: (message, ...args) => {
    logger.graylog(message, args);
    winstonLogger.warn(message);
  },
  info: (message, ...args) => {
    logger.graylog(message, args);
    winstonLogger.info(message);
  },
  debug: (message, ...args) => {
    logger.graylog(message, args);
    winstonLogger.debug(message);
  },
  graylog: (message, args) => {
    try {
      if (process.env.GRAYLOG_ENABLED === 'yes') {
        let composed = {};
        args.forEach((arg) => {
          if (typeof arg === 'object') {
            Object.assign(composed, arg);
          }
        });
        graylog.info.a(message, message, composed);
      }
    } catch (err) {
      console.error(`Failed to log to graylog: ${err}`);
    }
  },
};

module.exports = logger;
