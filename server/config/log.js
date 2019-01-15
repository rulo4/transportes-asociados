require('dotenv').config();
const {createLogger, format, transports} = require('winston');

const options = {
  file: {
    level: process.env.LOG_LEVEL,
    filename: 'server/log/app.log',
    handleExceptions: true,
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.json()
    ),
    maxsize: 5242880,
    maxFile: 3,
    colorize: false,
  },
  console: {
    level: process.env.LOG_LEVEL,
    handleExceptions: true,
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.json(),
        format.prettyPrint(),
        format.colorize()
    ),
  },
};

const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
