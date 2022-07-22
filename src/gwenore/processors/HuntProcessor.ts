import { HuntEventData } from "../../types/event";
import { ProcessResult, RESULTS } from "../../types/process";
import RedisService from "../database/redis";
import BaseProcessor from "./BaseProcessor";

export default class HuntProcessor extends BaseProcessor {

    private getIncrementInTermsOfQuest() : number {
        return this.getIncrementCountByQuestId();
    }

    private getIncrementCountByQuestId() : number {
        if(this.isRarityBased()){
            return this.getIncrementCountByRarity();
        }
        else if(this.isIdBased()){
            return this.getIncrementCountById();
        }

        // if it falls back to here it's a quest like 'hunt.10' (quest without extra identifier)
        return 1;
    }

    private isIdBased(){
        return this.quest.type.includes('id');
    }

    private getIncrementCountById(){
        const currentId = (this.event.data as HuntEventData).mob.id;
        const questId = this.quest.id.split('.')[2];
        return (currentId === questId ? 1 : 0);
    }

    private isRarityBased(): boolean {
        return this.quest.type.includes('rarity');
    }

    private getIncrementCountByRarity(){
        const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'ultimate'];
        const currentRarity = (this.event.data as HuntEventData).mob.rarity;
        const questRarity = rarityScale.indexOf(this.quest.id.split('.')[2]);
        return (currentRarity === questRarity ? 1 : 0);
    }

    async process(): Promise<ProcessResult> {
        const current = await this.getCurrentProgress();
        const required = parseInt(this.quest.id.split('.')[1]);

        // data comes a little bit unorganized so we need to sum it up
        const increment = this.getIncrementInTermsOfQuest();

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