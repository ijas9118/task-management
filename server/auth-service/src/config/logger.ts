import winston from "winston";

import { config } from "./config";

const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const customColors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  http: "green",
  debug: "blue",
};

winston.addColors(customColors);

const logger = winston.createLogger({
  level: config.log_level,
  defaultMeta: { service: config },
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
