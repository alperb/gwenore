import moment from "moment";
import { SerializableQuest } from "../../types/quests";

export default class Space {
    space: Map<string, boolean>;
    private currentQuests: Record<string, SerializableQuest>;
    private currentTimestamp = 0;
    constructor(){
        this.space = new Map();
        this.currentQuests = {};
    }

    setDailyQuests(quests: Record<string, SerializableQuest>){
        this.currentQuests = quests;
    }

    getCurrentQuests(): Record<string, SerializableQuest>{
        const remainingToNextDay = moment().endOf('day').diff(moment(this.currentTimestamp), 'seconds');
        if(remainingToNextDay <= 0) return {};
        return this.currentQuests;
    }

    setCurrentQuests(quests: Record<string, SerializableQuest>){
        this.currentTimestamp = moment().unix();
        this.currentQuests = quests;
    }

}