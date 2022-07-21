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

const config: DailyQuestConfigType = {
    "types": {
        "hunt.by.id": {
            "rarities": [
                {
                    "quests": [
                        {
                            "id": "hunt.10.brown_wolf",
                            "name": "Hunt 10 Brown Wolves"
                        },
                        {
                            "id": "hunt.10.punarut_cultist",
                            "name": "Hunt 10 Punarut Cultists"
                        },
                        {
                            "id": "hunt.10.goblin_bandit",
                            "name": "Hunt 10 Goblin Bandit"
                        },
                        {
                            "id": "hunt.10.skeleton_troop",
                            "name": "Hunt 10 Skeleton Troop"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.frostgolem",
                            "name": "Hunt 10 Frost Golem"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.firegolem",
                            "name": "Hunt 10 Fire Golem"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.punarut_leader",
                            "name": "Hunt 10 Punarut Leader"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.skeleton_king",
                            "name": "Hunt 10 Skeleton King"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.punarut_council",
                            "name": "Hunt 10 Punarut Council"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.infernaldragon",
                            "name": "Hunt 10 Infernal Dragon"
                        }
                    ]
                }
            ]
        },
        // "hunt.by.rarity": {},
        // "hunt.by.count": {},

        // "loot.by.rarity": {},
        // "loot.by.count": {},

        // "duel.by.count": {},

        "collect-gold.by.count": {
            "rarities": [
                {
                    "quests": [
                        {
                            "id": "collect-gold.100",
                            "name": "Collect 100 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.1000",
                            "name": "Collect 1000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.10000",
                            "name": "Collect 10000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.100000",
                            "name": "Collect 100000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.1000000",
                            "name": "Collect 1000000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.10000000",
                            "name": "Collect 10000000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.100000000",
                            "name": "Collect 100000000 gold"
                        }
                    ]
                }
            ]
        },

        // "win-duel.by.count": {},

        // "sell.by.count": {},
        // "sell.by.rarity": {},

        // "clear-dungeon.by.count": {},
        // "clear-dungeon.by.rarity": {},

        // "collect-item.by.count": {},
        // "collect-item.by.rarity": {},

        // "repair.by.count": {},

        // "defeat-dungeon-boss.by.count": {},
        // "defeat-dungeon-boss.by.rarity": {}
        
    }
}
export default config;