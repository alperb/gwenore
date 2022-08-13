import moment from 'moment';
import { createClient, RedisClientType } from 'redis';
import { LOGTYPE } from '../../types/log';
import ServiceLogger from '../logger/ServiceLogger';

export default class RedisService {
    static client: RedisClientType;
    static isConnected = false;

    private static registerListeners(){
        RedisService.client.on('error', err => {
            ServiceLogger.log(LOGTYPE.ERROR, `Redis client connection error`, err);
            RedisService.isConnected = false;
            RedisService.connect();
        });
        RedisService.client.on('reconnecting', param => ServiceLogger.log(LOGTYPE.INFO, `Redis client initiates reconnecting, attemp ${param.attempt}`));
        RedisService.client.on('connect', () => ServiceLogger.log(LOGTYPE.INFO, `Redis client status became: connected`));
        RedisService.client.on('ready', () => ServiceLogger.log(LOGTYPE.INFO, `Redis client status became: ready`));
        RedisService.client.on('end', () => ServiceLogger.log(LOGTYPE.INFO, `Redis client status became: disconnected`));
    }

    static async connect(){
        try{
            if(!RedisService.isConnected){
                
                RedisService.client = createClient({
                    url: process.env.REDIS_URI as string,
                });
                RedisService.registerListeners();
                await RedisService.client.connect();

                // RedisService.client.on('error', (err: unknown) => {
                    // RedisService.connect();
                // });

                RedisService.isConnected = true;
                ServiceLogger.log(LOGTYPE.INFO, "Redis connected");
            }
        }
        catch(e){
            ServiceLogger.log(LOGTYPE.ERROR, "Redis connection error", e);
        }
    }

    static async get(key: string): Promise<string> {
        if(!RedisService.isConnected){
            await RedisService.connect();
        }
        return (await RedisService.client.get(key)) as string;
    }

    /**
     * format to save event specific data: {quest_type}_{character_id}_{event_name}
     * format to save global data: global_{character_id}_{event_name}
     */
    static async set(key: string, data: string, shouldExpire = true): Promise<void> {
        if(!RedisService.isConnected){
            await RedisService.connect();
        }
        await RedisService.client.set(key, data, shouldExpire ? {'EX': RedisService.getSecondsLeftTomorrow()} : {});
    }

    static getSecondsLeftTomorrow(){
        return moment().endOf('day').diff(moment(), 'seconds');
    }
}