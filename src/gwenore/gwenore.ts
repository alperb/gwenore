import GwenoreEvent from "../types/event";
import { LOGTYPE } from "../types/log";
import { QuestCountRequest } from "../types/requests";
import MongoService from "./database/connection";
import DailyQuestDecider from "./deciders/dailyquest-decider";
import QuestDecider from "./deciders/base-decider";
import Logger from "./logger/logger";
import Space from "./space/space";
import RedisService from "./database/redis";

export default class Gwenore {
    static MongoService: MongoService = MongoService;
    static Space: Space = new Space();
    static deciders: QuestDecider[] = [
        new DailyQuestDecider()
    ];
    
    static async init() {
        Logger.log(LOGTYPE.INFO, "Gwenore started");
        MongoService.connect();
        RedisService.connect();
    }

    static async insertQuestsForPlayer(snowflake: string){
        const quests = Gwenore.Space.currentQuests;
        for(const quest of quests){
            const quest_key = `dailyquests_${snowflake}_${quest.id}`;
            await RedisService.set(quest_key, "0");
        }
    }

    static async ensureQuestExistence(event: GwenoreEvent){
        const quests = Gwenore.Space.currentQuests;
        for(const quest of quests){
            const quest_key = `dailyquests_${event.snowflake}_${quest.id}`;
            const playerquest = await RedisService.get(quest_key);
            if(playerquest == null){
                await RedisService.set(quest_key, "0");
            }
        }
        
    }

    static process(request: QuestCountRequest){
        Gwenore.ensureQuestExistence(request.event);


        // get the handlers for the event
        for(const decider of Gwenore.deciders){
            const handler = decider.shouldProcess(request.event);
            if(handler){
                handler.apply();
            }
        }
    }
}