import { Player } from "./types";

export default interface GwenoreEvent {
    characterId: string,
    name: string,
    channelId: string,
    snowflake: string,
    guildId: string,
    data: CollectGoldEventData | CollectExperienceEventData | HuntEventData,
    timestamp: number
}

export const enum EVENTTYPE {
    DAILYQUEST = "dailyquest"
}

// Hunt Event Types
export interface HuntEventData {
    player : Player;
    result: HuntMatchResult;
    rewards?: Record<string, unknown>;
    autoFeatures: AutoFeaturesResult;
    mob: Enemy;
    stats: EnemyMatchResultStats[][];
}

export interface Enemy {
    rarity: number;
    status?: Record<string, unknown>,
    timestamp: string;
    id: string,
    loot?: unknown[],
    mobid: string;
    passcode: string;
}

export interface EnemyMatchResultStats {
    skillUseCounts: SkillUseCounts[];
    snowflake: string,
    characterId?: string;
    totalDamageDone: {
        effect: number;
        skill: number;
    }
}

export interface SkillUseCounts {
    count: number;
    skillId: number;
}

export interface AutoFeaturesResult {
    autorepair: boolean,
    autorevive: string | number | boolean;
}

export const enum HuntMatchResult {
    WIN = 0,
    LOSE = 1,
    DRAW = 2
}

// Collect Event Types
export const enum CollectSource {
    LOOT = 'loot',
    HUNT = 'hunt',
}

export const enum CollectRewardType {
    GOLD = 'gold',
    EXP = 'exp'
}

export interface CollectExperienceRewardData {
    type: CollectRewardType,
    value: number
}

export interface CollectExperienceEventData {
    rewardType: CollectRewardType,
    rewards: CollectExperienceRewardData[],
    source: CollectSource
}

export interface CollectGoldRewardData {
    type: CollectRewardType;
    value: number;
}

export interface CollectGoldEventData {
    rewardType: CollectRewardType,
    rewards: CollectGoldRewardData[],
    source: CollectSource
}