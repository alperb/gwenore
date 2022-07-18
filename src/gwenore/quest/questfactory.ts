import { QuestConfig } from "../../types/quests";
import { Player } from "../../types/types";
import DailyQuest from "./dailyquest";
import Quest from "./quest";

export default class QuestFactory {
    static create(type: string, player: Player, config: QuestConfig): Quest {
        switch(type){
            case "dailyquest": {
                return new DailyQuest(player, config);
            }
            default: {
                throw new Error(`Unknown quest type: ${type}`);
            }
        }
    }
}