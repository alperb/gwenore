import { SerializableQuest } from "../../types/quests";
import { Player, SetQuestResult, GetQuestResult } from "../../types/types";
import Gwenore from "../Gwenore";
import BaseManager from "./BaseManager"
import QuestConfig from '../config/daily';
import { LOGTYPE } from "../../types/log";
import RedisService from "../database/RedisService";
import DailyQuestDecider from "../deciders/DailyQuestDecider";
import ServiceLogger from "../logger/logger";
import { ProcessResult } from "../../types/process";

export default class DailyQuestManager extends BaseManager {
    quests: Record<string, SerializableQuest> = {};
    constructor(){
        super();
        this.decider = new DailyQuestDecider();
    }

    private async handleDailyQuestComplete(result: ProcessResult){
        // first check if player is premium
        // if not open the next quest for the player

        // finally send notification to the valenia
    }

    private generateRandomQuests(): Record<string, SerializableQuest> {
        if(Object.keys(Gwenore.Space.currentQuests).length !== 0) return Gwenore.Space.currentQuests;

        const questList: Record<string, SerializableQuest> = {};
        for(let i = 0; i < 4; i++){
            let randomKey = this.getRandomKeyFrom(QuestConfig.types);
            while(questList[randomKey] !== undefined){
                randomKey = this.getRandomKeyFrom(QuestConfig.types);
            }
            const randomized = Math.floor(Math.random() * QuestConfig.types[randomKey].rarities[i].quests.length);
            questList[randomKey] = {type: randomKey, ...QuestConfig.types[randomKey].rarities[i].quests[randomized]};
        }
        Gwenore.Space.currentQuests = questList;
        return questList;
    }

    async setQuests(player: Player): Promise<SetQuestResult> {
        try{
            const generatedQuests = this.generateRandomQuests();
            const quest_key = `dailyquests_${player.snowflake}`;

            // we must set only one quest if player doesnt have any
            const playerPremium = await Gwenore.getPlayerPremiumStatus(player);
            // if player has premium subscription we must set quests up to his type of rarity

            const settingQuests: Record<string, unknown> = {};
            let i = 0;
            const max = playerPremium !== -1 ? playerPremium : 1;
            for(const questtype of Object.keys(generatedQuests)){
                if(i >= max) break;
                settingQuests[questtype] = generatedQuests[questtype];
                i++;
            }

            // new quests must be set if player completes one
            // this completion can be done by event handling

            // set quests to redis
            await RedisService.set(quest_key, JSON.stringify(settingQuests));

            // set quest existence to space
            Gwenore.Space.space.set(quest_key, true);
            return {result: "success"}
        }
        catch(e){
            ServiceLogger.log(LOGTYPE.ERROR, `Error while setting quests for snowflake (${player.snowflake})`, e);
            return {result: "error", error: e}
        }
    }

    async getQuests(player: Player): Promise<GetQuestResult> {
        try{
            const quests = await RedisService.get(`dailyquests_${player.snowflake}`);
            if(quests !== null) {
                return {result: "success", quests: JSON.parse(quests)};
            }
            this.setQuests(player);
            return this.getQuests(player);
        }
        catch(e){
            ServiceLogger.log(LOGTYPE.ERROR, `Error while getting quests for snowflake (${player.snowflake})`, e);
            return {result: "error", error: e};
        }
    }

    async isQuestsAvailable(player: Player): Promise<boolean> {
        return (await RedisService.get(`dailyquests_${player.snowflake}`)) !== null;
    }

    async checkIfPlayerHasQuest(player: Player, questid: string): Promise<boolean> {
        const queryKey = `dailyquests_${player.snowflake}`;
        const playerQuests = await RedisService.get(queryKey);
        if(playerQuests !== null){
            const quests = JSON.parse(playerQuests);
            return quests[questid] !== undefined;
        }
        this.setQuests(player);
        return this.checkIfPlayerHasQuest(player, questid);
    }

}