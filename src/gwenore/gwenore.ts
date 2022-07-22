import GwenoreEvent from "../types/event";
import { LOGTYPE } from "../types/log";
import { QuestCountRequest } from "../types/requests";
import MongoService from "./database/connection";
import Logger from "./logger/logger";
import Space from "./space/space";
import RedisService from "./database/redis";
import DailyQuestManager from "./managers/DailyQuestManager";
import BaseManager from "./managers/BaseManager";

export default class Gwenore {
    static MongoService: MongoService = MongoService;
    static Space: Space = new Space();
    static managers: Record<string,BaseManager> = {
        'dailyquest': new DailyQuestManager()
    };
    
    static async init() {
        Logger.log(LOGTYPE.INFO, "Gwenore started");
        MongoService.connect();
        RedisService.connect();
    }

    static async ensureQuestExistence(event: GwenoreEvent){
        return (await Gwenore.managers['dailyquest'].isQuestsAvailable({snowflake: event.snowflake, characterId: event.characterId}));
    }

    static async process(request: QuestCountRequest){
        const doesQuestsExist = await Gwenore.ensureQuestExistence(request.event);
        if(!doesQuestsExist){
            await Gwenore.managers.dailyquest.setQuests({snowflake: request.event.snowflake, characterId: request.event.characterId});
        }


        // get the handlers for the event
        for(const managerkey of Object.keys(Gwenore.managers)){
            const handler = Gwenore.managers[managerkey].decider.decide(request.event);
            if(handler){
                await handler.handle();
            }
        }
    }
}