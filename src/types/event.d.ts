import { Player } from "./types";

export default interface GwenoreEvent {
    characterId: string,
    name: string,
    channelId: string,
    snowflake: string,
    guildId: string,
    data: CollectGoldEventData | CollectExperienceEventData | HuntEventData | LootEventData | DuelEventData | SellEventData | CollectItemEventData,
    timestamp: number
}

export const enum EVENTTYPE {
    DAILYQUEST = "dailyquest"
}

// Collect Item Types
export interface CollectItemEventData {
    rewardType: CollectRewardType;
    rewards: CollectItemReward[];
    source: CollectSource;
}

export const enum ITEMTYPE {
    KEY = "dungeonkey",
    WEAPON = 'weapon',
    ARMOR = 'armor',
    CHEST = 'chest',
    SOULGEM = 'soulgem',
}

export interface CollectItemReward {
    count?: number;
    item: {
        rarity: number;
        type: 'weapon' | 'armor';
        [key:string]: unknown;
    }
    [key:string]: unknown;
}

// Sell Event Types
export interface SellEventData {
    sellingItems: unknown[2][];
}

export interface ProcessableSellingItem {
    rarity: number;
}

// Duel Event Types
export interface DuelEventData {
    autoFeatures: AutoFeaturesResult;
    isRandom: boolean;
    league: Record<string, unknown>;
    result: DuelResultData;
    stats: SkillUseCounts[][],
    teams: DuelPlayerData[][];
}

export interface DuelPlayerData {
    snowflake: string;
    id: string;
}

export interface DuelResultData {
    winner: number;
    reason: string;
}

// Loot Event Types
export interface LootEventData {
    result: boolean,
    rewards?: Record<string, unknown>;
    player: Player;
    chest: ChestData;
}

export interface ChestData {
    id: string;
    loot?: unknown[];
    passcode: string;
    rarity: number;
    status: ChestStatusData;
}

export interface ChestStatusData {
    opendate: number,
    opener: {
        snowflake: string;
    },
    channel: string;
    currently: string;
    guild: string;
    isPremium: boolean;
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
    EXP = 'exp',
    ITEM = 'item',
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