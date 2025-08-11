import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const customColors = {
  error: "brightRed",
  warn: "brightYellow",
  info: "brightGreen",
  http: "brightCyan",
  debug: "brightBlue",
};

winston.addColors(customColors);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
