import GwenoreEvent, { CollectGoldEventData } from "../../types/event";
import { LOGTYPE } from "../../types/log";
import { ProcessResult, RESULTS } from "../../types/process";
import { QuestConfig } from "../../types/quests";
import RedisService from "../database/redis";
import Logger from "../logger/logger";
import BaseProcessor from "./base-processor";

export default class CollectGoldProcessor extends BaseProcessor {
    constructor(event: GwenoreEvent) {
        super(event);
    }

    async process(config: QuestConfig): Promise<ProcessResult> {
        try{
            await this.init();

            // update the global entry for the given event
            this.increment(this.decideIncrementableTypes());

            const response: ProcessResult = {
                result: await this.decideProcessResult(config),
                event: this.event
            }
            return response;
        }
        catch(e){
            Logger.log(LOGTYPE.ERROR, `Event processing failed for event (${this.event.name}) for player (${this.event.snowflake} : ${this.event.characterId})` ,e);
            return {
                result: RESULTS.FAILURE,
                event: this.event
            }
        }
    }

    async decideProcessResult(config: QuestConfig): Promise<RESULTS> {
        const global_key = `global_${this.event.characterId}_${this.event.name}`;
        const sum = this.event.data.rewards.reduce((acc, cur) => acc + cur.value, 0);
        const newamount = parseInt(this.globalEntry) + sum;
        await RedisService.set(global_key, newamount.toString());

        // check if the new value is greater than the required value when increment is applied
        if(newamount >= config.required && config.required > parseInt(this.globalEntry)){
            return RESULTS.SUCCESS_WITH_REWARD;
        }
        return RESULTS.SUCCESS;
    }

    decideIncrementableTypes(): string[] {
        const types: string[] = [
            this.event.name
        ];

        return types;
    }

    async increment(types: string[]): Promise<void>{
        const sum = (this.event.data as CollectGoldEventData).rewards.reduce((acc, cur) => acc + cur.value, 0);
        for(const type of types){
            const key = `${this.event.name}_${type}`;
            const amount = await RedisService.get(key);
            const value = parseFloat(amount) + sum;
            await RedisService.set(key, value.toString());
        }
    }
}