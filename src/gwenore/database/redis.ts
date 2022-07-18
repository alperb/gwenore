import moment from 'moment';
import { createClient } from 'redis';

export default class RedisService {
    static client: any;

    static async connect(){
        RedisService.client = createClient({
            url: 'rediss://alper:57b29025bdc04a5abf26b289ad6f21e5@eu2-proud-lamb-30511.upstash.io:30511'
          });
        await RedisService.client.connect();
        RedisService.client.on('error', (err: unknown) => console.log('Redis Client Error', err));
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