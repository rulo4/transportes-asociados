const {createLogger, format, transports} = require('winston');

const env = process.env.NODE_ENV || 'development';

const options = {
  file: {
    level: env === 'development' ? 'debug' : 'info',
    filename: 'log/app.log',
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
    level: 'development'? 'debug': 'info',
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
