import GwenoreEvent from "../../types/event";
import { ProcessResult } from "../../types/process";
import { SerializableQuest } from "../../types/quests";
import RedisService from "../database/redis";

export default abstract class BaseProcessor {
    event!: GwenoreEvent;
    quest!: SerializableQuest;

    init(event: GwenoreEvent, quest: SerializableQuest){
        this.event = event;
        this.quest = quest;
    }

    async getCurrentProgress(){
        const progress = await RedisService.get(`dailyquests_${this.event.snowflake}_${this.quest.id}`);
        if(progress === null) return 0;
        else return parseInt(progress);
    }
    
    abstract process(): Promise<ProcessResult>;
}