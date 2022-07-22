import GwenoreEvent from "../../types/event";
import { ProcessResult, RESULTS } from "../../types/process";
import { SerializableQuest } from "../../types/quests";
import RedisService from "../database/RedisService";

export default abstract class BaseProcessor {
    event!: GwenoreEvent;
    quest!: SerializableQuest;
    abstract getIncrementInTermsOfQuest(): number;

    init(event: GwenoreEvent, quest: SerializableQuest){
        this.event = event;
        this.quest = quest;
    }

    async getCurrentProgress(){
        const progress = await RedisService.get(`dailyquests_${this.event.snowflake}_${this.quest.id}`);
        if(progress === null) return 0;
        else return parseInt(progress);
    }

    protected isRarityBased(): boolean {
        return this.quest.type.includes('rarity');
    }

    protected isIdBased(){
        return this.quest.type.includes('id');
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