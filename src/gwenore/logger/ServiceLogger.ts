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
        let printing = `${chalk.bold.gray('[' + time + ']')}`;
        switch (log.type) {
            case LOGTYPE.INFO:
                printing += `${chalk.bold.gray('[INFO]')} ` + log.message;
                break;
            case LOGTYPE.ERROR:
                printing += `${chalk.bold.red('[ERROR]')} ` + chalk.red(log.message);
                break;
            case LOGTYPE.WARN:
                printing += `${chalk.bold.yellow('[WARN]')} ` + chalk.yellow(log.message);
                break;
            case LOGTYPE.DEBUG:
                printing += `${chalk.bold.gray('[DEBUG]')} ` + chalk.bgGray(log.message);
                break;
            default:
                printing += `${chalk.bold.gray('[DEFAULT]')} ` + log.message;
                break;
        }
        if(log.details && log.details.length > 0){
            printing += '\n' + log.type === LOGTYPE.ERROR ? chalk.red(JSON.stringify(log.details)) : chalk.green(JSON.stringify(log.details));
        }
        console.log(printing);
        if(log.error && log.type === LOGTYPE.ERROR){
            console.error(log.error);
        }
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