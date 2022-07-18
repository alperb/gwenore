export default interface GwenoreEvent {
    characterId: string,
    name: string,
    channelId: string,
    snowflake: string,
    guildId: string,
    data: CollectGoldEventData | CollectExperienceEventData,
    timestamp: number
}

export const enum EVENTTYPE {
    DAILYQUEST = "dailyquest"
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