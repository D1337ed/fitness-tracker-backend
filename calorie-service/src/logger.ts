import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '..', '..', 'logs', 'calorie');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'app.log') }),
    new winston.transports.Console(),
  ],
});

export default logger;
