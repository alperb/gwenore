import { SerializableQuest } from "./quests";

export interface Player {
    snowflake: string;
    characterId?: string;
}

export interface SetQuestResult {
    result: string;
    error?: unknown
}

export interface GetQuestResult {
    result: string;
    quests?: Record<string, SerializableQuest>;
    error?: unknown
}

export const enum QUESTTYPE {
    DAILYQUEST = 'dailyquest'
}