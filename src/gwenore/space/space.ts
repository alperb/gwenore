import { SerializableQuest } from "../../types/quests";

export default class Space {
    space: Map<string, boolean>;
    currentQuests: Record<string, SerializableQuest>;
    constructor(){
        this.space = new Map();
        this.currentQuests = {};
    }

    setDailyQuests(quests: Record<string, SerializableQuest>){
        this.currentQuests = quests;
    }

}