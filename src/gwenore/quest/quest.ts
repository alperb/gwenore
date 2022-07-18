import { QuestConfig } from "../../types/quests";
import { Player } from "../../types/types";

export default abstract class Quest {
    private config: QuestConfig;
    player: Player;

    constructor(player: Player, config: QuestConfig) {
        this.config = config;
        this.player = player;
    }

    abstract init(): void;
    abstract getProgress(): void; // TODO: must return QuestProgress object
}