import {SingleRarityDailyQuestType} from "../gwenore/config/daily";

export interface DailyQuestConfig {
    id: string;
    name: string;
    rarities: SingleRarityDailyQuestType[];
}

export interface SerializableQuest {
    id: string;
    name: string;
}