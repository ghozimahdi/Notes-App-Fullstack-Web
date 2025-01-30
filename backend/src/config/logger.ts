import winston from "winston";
import "winston-daily-rotate-file";
import {appConfig, Flavor} from "./env";

const logFormat = winston.format.combine(
  winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
  winston.format.printf(({timestamp, level, message, stack}) => {
    if (appConfig.flavor !== Flavor.PRODUCTION) {
      return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level.toUpperCase()}]: An unexpected error occurred.`;
  }),
);

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.json()
  ),
});

const logger = winston.createLogger({
  level: appConfig.flavor === Flavor.PRODUCTION ? "info" : "debug",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      silent: appConfig.flavor === Flavor.PRODUCTION,
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    dailyRotateTransport,
  ],
});

export default logger;