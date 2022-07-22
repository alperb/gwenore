export interface DailyQuestConfigType {
    types: Record<string, SingleDailyQuestConfigType>
}
export interface SingleDailyQuestConfigType {
    rarities: SingleRarityDailyQuestType[];
}
export interface SingleRarityDailyQuestType {
    quests: SingleDailyQuestType[];
}
export interface SingleDailyQuestType {
    id: string;
    name: string;
}
import * as config from './daily.json';


        // "sell.by.count": {},
        // "sell.by.rarity": {},

        // "clear-dungeon.by.count": {},
        // "clear-dungeon.by.rarity": {},

        // "collect-item.by.count": {},
        // "collect-item.by.rarity": {},

        // "repair.by.count": {},

        // "defeat-dungeon-boss.by.count": {},
        // "defeat-dungeon-boss.by.rarity": {}
const rewards = [
    [
        {
            type: 'item',
            code: ''
        }
    ]
]

export default {QuestConfig: config, QuestRewards: rewards};