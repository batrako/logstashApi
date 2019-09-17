const { createLogger, format, transports } = require("winston");

module.exports= createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'api-elk' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.Console()
    ]
  });
