import GwenoreEvent from "../../types/event";
import { RESULTS } from "../../types/process";
import { QuestConfig, SerializableQuest } from "../../types/quests";
import { Player, QUESTTYPE } from "../../types/types";
import RedisService from "../database/RedisService";
import Gwenore from "../Gwenore";
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
        const quests = await this.getPlayerQuests({snowflake: this.event.snowflake, characterId: this.event.characterId});

        for(const eventtype of Object.keys(quests)){
            const splitted = eventtype.split(".");

            const player = {snowflake: this.event.snowflake, characterId: this.event.characterId};
            const doesPlayerHaveQuest = await Gwenore.checkIfPlayerHasQuest(QUESTTYPE.DAILYQUEST, player, eventtype);

            if(doesPlayerHaveQuest && this.event.name === splitted[0]){
                const processor = this.processors[splitted[0]];
                processor.init(this.event, quests[eventtype]);
                const r = await (processor.process());
                if(r.result === RESULTS.SUCCESS_WITH_REWARD){
                    Gwenore.Events.emit("dailyquestComplete", r);
                }
            }
        }
    }
}