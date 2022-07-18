import { QuestConfig } from "../../types/quests";
import { Player } from "../../types/types";
import Quest from "./quest";

export default class DailyQuest extends Quest {
    constructor(player: Player, config: QuestConfig) {
        super(player, config);
    }

    init(): void {
        throw new Error("Method not implemented.");
    }
    
    getProgress(): void {
        throw new Error("Method not implemented.");
    }
}