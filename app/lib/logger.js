const winston = require("winston");
const moment = require("moment-timezone");
const _ = require("lodash");

const graylog = require('graygelf')({
  host: process.env.GRAYLOG_HOST,
  port: process.env.GRAYLOG_PORT
});

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.printf(info => {
    const { timestamp, level, message } = info;

    const ts = moment()
      .tz("America/Sao_Paulo")
      .format("YYYY/MM/DD HH:mm:ss.SSS");
    return `${ts} [${level}]: ${message}`;
  })
);

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: customFormat
    })
  ]
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
            _.each(args, (arg) => {
                if (_.isObject(arg)){
                    _.merge(composed, arg)
                }
            });

           graylog.info.a(message, message, composed);
        }    
    } catch (err) {
        console.log(err);
    }
  }
};

module.exports = logger;
