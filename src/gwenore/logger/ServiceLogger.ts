import Mongo from '../database/MongoService';
import { MongoClient } from "mongodb";
import chalk from 'chalk';
import Log, {LOGTYPE} from '../../types/log';
import moment from 'moment';

export default class ServiceLogger {
    mongo!: MongoClient;
    constructor(){
        this.init();
    }

    async init(){
        this.mongo = await Mongo.getInstance();
    }

    static print(log: Log) {
        const time = moment(log.time).format('YYYY-MM-DD HH:mm:ss');
        let printing = `${chalk.bold.gray('[' + time + ']')} `;
        switch (log.type) {
            case LOGTYPE.INFO:
                printing += log.message;
                break;
            case LOGTYPE.ERROR:
                printing += chalk.red(log.message);
                break;
            case LOGTYPE.WARN:
                printing += chalk.yellow(log.message);
                break;
            case LOGTYPE.DEBUG:
                printing += chalk.bgGray(log.message);
                break;
            default:
                printing += log.message;
                break;
        }
        if(log.error){
            printing += '\n' + chalk.red(log.error);
        }
        if(log.details && log.details.length > 0){
            printing += '\n' + chalk.red(JSON.stringify(log.details));
        }
        console.log(printing);
    }

    static log(type: LOGTYPE, message: string, ..._args: unknown[]): Log {
        const log = {
            time: Date.now(),
            type,
            message,
            error: _args[0] as Error,
            details: _args
        };
        ServiceLogger.print(log);
        return log;
    }
}