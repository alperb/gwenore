import GwenoreEvent from "../types/event";
import { LOGTYPE } from "../types/log";
import { QuestCountRequest } from "../types/requests";
import MongoService from "./database/MongoService";
import Space from "./space/space";
import RedisService from "./database/RedisService";
import DailyQuestManager from "./managers/DailyQuestManager";
import BaseManager from "./managers/BaseManager";
import { Player, QUESTTYPE } from "../types/types";
import ServiceLogger from "./logger/ServiceLogger";
import { EventEmitter } from 'events';

export default class Gwenore extends EventEmitter {
    static Events = new EventEmitter();
    static Space: Space = new Space();
    static managers: Record<string, BaseManager> = {
        'dailyquest': new DailyQuestManager()
    };
    
    static async init() {
        ServiceLogger.log(LOGTYPE.INFO, "Gwenore started");
        MongoService.connect();
        RedisService.connect();
    }

    static getPlayerPremiumStatus(player: Player){
        return MongoService.getPlayerPremiumStatus(player);
    }

    static checkIfPlayerHasQuest(questtype: QUESTTYPE, player: Player, questid: string){
        return Gwenore.managers[questtype].checkIfPlayerHasQuest(player, questid);
    }

    static ensureQuestExistence(event: GwenoreEvent){
        return Gwenore.managers['dailyquest'].isQuestsAvailable({snowflake: event.snowflake, characterId: event.characterId});
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