import GwenoreEvent from "../../types/event";
import { ProcessResult } from "../../types/process";
import { QuestConfig, SerializableQuest } from "../../types/quests";
import { Player } from "../../types/types";
import RedisService from "../database/redis";
import BaseHandler from "./BaseHandler";

export default class DailyQuestHandler extends BaseHandler {
    quest!: QuestConfig;
    constructor(event: GwenoreEvent){
        super(event);
    }

    async getPlayerQuests(player: Player): Promise<Record<string, SerializableQuest>> {
        const quests = await RedisService.get(`dailyquests_${player.snowflake}`);
        if(quests !== null) {
            return JSON.parse(quests);
        }
        return {}
    }

    async handle(): Promise<void> {
        const results: Promise<ProcessResult>[] = [];
        const quests = await this.getPlayerQuests({snowflake: this.event.snowflake, characterId: this.event.characterId});

        for(const eventtype of Object.keys(quests)){
            const splitted = eventtype.split(".");
            if(this.event.name === splitted[0]){
                const processor = this.processors[splitted[0]];
                processor.init(this.event, quests[eventtype]);
                results.push(processor.process());
            }
        }
        const res = await Promise.all(results);
        console.log({res});
    }
}