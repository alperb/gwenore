import GwenoreEvent from "../../types/event";
import { DailyQuestConfig, SerializableQuest } from "../../types/quests";
import BaseProcessor from "../processors/base-processor";
import CollectGoldProcessor from "../processors/collect-gold";
import QuestHandler from "./handler";
import DailyQuestList from "../config/daily";

export default class DailyQuestHandler extends QuestHandler {
    processors: BaseProcessor[] = [
        new CollectGoldProcessor(this.event)
    ];

    constructor(event: GwenoreEvent) {
        super(event);
    }

    getDailyQuestsWithPrefix(prefix: string): DailyQuestConfig[] {
        const quests: DailyQuestConfig[] = [];
        for(const quest of Object.keys(DailyQuestList.types)){
            const splitted = quest.split('.');
            if(splitted[0] === prefix){
                const conf: SerializableQuest = {
                    id: splitted[1],
                    name: DailyQuestList.types[quest].rarities[0].quests[0].name // 0's must come from redis to identify the quest
                } 
                quests.push(conf);
            }
        }
        return quests;
    }
    
    apply(): Promise<void> {
        for(const processor of this.processors){
            if(processor instanceof CollectGoldProcessor){
            }
            processor.process()
        }
    }
}