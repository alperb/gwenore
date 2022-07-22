import { CollectGoldEventData } from "../../types/event";
import { ProcessResult, RESULTS } from "../../types/process";
import RedisService from "../database/RedisService";
import BaseProcessor from "./BaseProcessor";

export default class CollectGoldProcessor extends BaseProcessor {

    async process(): Promise<ProcessResult> {
        const current = await this.getCurrentProgress();
        const required = parseInt(this.quest.id.split('.')[1]);

        // data comes a little bit unorganized so we need to sum it up
        const increment = (this.event.data as CollectGoldEventData).rewards.reduce((acc, reward) => {
            if(reward.type === 'gold'){
                return acc + reward.value;
            }
            return acc;
        }
        , 0);

        // set the new progress to redis
        const newProgress = current + increment;
        await RedisService.set(`dailyquests_${this.event.snowflake}_${this.quest.id}`, newProgress.toString());

        // check if the quest is completed in this progress step
        if(newProgress >= required && current < required){
            return {
                result: RESULTS.SUCCESS_WITH_REWARD,
                event: this.event,
                quest: this.quest
            }
        }
        else return {result: RESULTS.SUCCESS, event: this.event, quest: this.quest};
    }
}