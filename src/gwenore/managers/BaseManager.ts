import { Player, SetQuestResult, GetQuestResult } from "../../types/types";
import BaseDecider from "../deciders/BaseDecider";

export default abstract class BaseManager {
    decider!: BaseDecider;
    abstract setQuests(player: Player): Promise<SetQuestResult>;
    abstract getQuests(player: Player): Promise<GetQuestResult>;
    abstract isQuestsAvailable(player: Player): Promise<boolean>;
    abstract checkIfPlayerHasQuest(player: Player, questid: string): Promise<boolean>;
    
    protected getRandomKeyFrom<T extends Record<string, unknown>>(extracting: T): keyof T {
        const keys = Object.keys(extracting);
        return keys[Math.floor(Math.random() * keys.length)];
    }
}