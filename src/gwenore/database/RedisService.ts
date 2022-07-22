import moment from 'moment';
import { createClient } from 'redis';
import { LOGTYPE } from '../../types/log';
import ServiceLogger from '../logger/logger';

export default class RedisService {
    static client: any;
    static isConnected = false;

    static async connect(){
        try{
            if(!RedisService.isConnected){

                RedisService.client = createClient({
                    url: process.env.REDIS_URI as string
                });
                await RedisService.client.connect();
                RedisService.client.on('error', (err: unknown) => console.log('Redis Client Error', err));

                RedisService.isConnected = true;
                ServiceLogger.log(LOGTYPE.INFO, "Redis connected");
            }
        }
        catch(e){
            ServiceLogger.log(LOGTYPE.ERROR, "Redis connection error", e);
        }
        
        
    }

    static async get(key: string): Promise<string> {
        if(!RedisService.client){
            await RedisService.connect();
        }
        return (await RedisService.client.get(key)) as string;
    }

    /**
     * format to save event specific data: {quest_type}_{character_id}_{event_name}
     * format to save global data: global_{character_id}_{event_name}
     */
    static async set(key: string, data: string, shouldExpire = true): Promise<void> {
        if(!RedisService.client){
            await RedisService.connect();
        }
        await RedisService.client.set(key, data, shouldExpire ? {'EX': RedisService.getSecondsLeftTomorrow()} : {});
    }

    static getSecondsLeftTomorrow(){
        return moment().endOf('day').diff(moment(), 'seconds');
    }
}