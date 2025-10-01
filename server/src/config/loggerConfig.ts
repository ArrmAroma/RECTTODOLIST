import winston from 'winston';
import path from 'path';

const logDir = path.resolve(__dirname,'../../logs');

const colorizer = winston.format.colorize();

const logFormat = winston.format.printf(({level,message,timestamp}) => {
    //return `${timestamp} ${level}: ${message}`;
    return colorizer.colorize(level,`${timestamp} ${level}: ${message}`);
})



export const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.timestamp({ format : 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(logDir,'developer.log'),
            level:'debug'
        })
    ]
})