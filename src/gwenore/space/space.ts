import { SerializableQuest } from "../../types/quests";

export default class Space {
    space: Map<string, SerializableQuest>;
    currentQuests: SerializableQuest[];
    constructor(){
        this.space = new Map();
        this.currentQuests = [];
    }

    setDailyQuests(quests: SerializableQuest[]){
        this.currentQuests = quests;
    }

}