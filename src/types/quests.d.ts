import {SingleRarityDailyQuestType} from "../gwenore/config/daily";

export interface DailyQuestConfig extends QuestConfig {
    id: string;
    name: string;
    rarities: SingleRarityDailyQuestType[];
}

export interface SerializableQuest {
    type: string;
    id: string;
    name: string;
}

export interface QuestConfig {
    id: string;
    name: string;
}