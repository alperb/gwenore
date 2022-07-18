import GwenoreEvent from "../../types/event";
import { ProcessResult, RESULTS } from "../../types/process";
import { QuestConfig } from "../../types/quests";
import RedisService from "../database/redis";

export default abstract class BaseProcessor {
    event: GwenoreEvent;
    globalEntry!: string;
    constructor(event: GwenoreEvent) {
        this.event = event;
    }

    async init() {
        const characterId = this.event.characterId;
        const global_key = `global_${characterId}_${this.event.name}`;
        this.globalEntry = await RedisService.get(global_key);
    }

    abstract decideProcessResult(config: QuestConfig): Promise<RESULTS>;
    abstract process(config: QuestConfig): Promise<ProcessResult>;
    abstract increment(types: string[]): Promise<void>;
}