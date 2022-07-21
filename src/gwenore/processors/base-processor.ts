import GwenoreEvent from "../../types/event";
import { ProcessResult, RESULTS } from "../../types/process";
import { SerializableQuest } from "../../types/quests";
import RedisService from "../database/redis";

export default abstract class BaseProcessor {
    event: GwenoreEvent;
    globalEntry!: string;
    prefix: string;

    constructor(event: GwenoreEvent, prefix: string) {
        this.event = event;
        this.prefix = prefix;
    }

    async init() {
        const characterId = this.event.characterId;
        const global_key = `global_${characterId}_${this.event.name}`;
        this.globalEntry = await RedisService.get(global_key);
    }

    abstract decideProcessResult(config: SerializableQuest): Promise<RESULTS>;
    abstract process(config: SerializableQuest): Promise<ProcessResult>;
    abstract increment(types: string[]): Promise<void>;
}