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
        "hunt.by.rarity": {
            "rarities": [
                {
                    "quests": [
                        {
                            "id": "hunt.10.common",
                            "name": "Hunt 10 Common Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.uncommon",
                            "name": "Hunt 10 Uncommon Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.rare",
                            "name": "Hunt 10 Rare Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.epic",
                            "name": "Hunt 10 Epic Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.legendary",
                            "name": "Hunt 10 Legendary Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.mythic",
                            "name": "Hunt 10 Mythic Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.10.ultimate",
                            "name": "Hunt 10 Ultimate Units"
                        }
                    ]
                },
            ]
        },
        "hunt.by.count": {
            "rarities": [
                {
                    "quests": [
                        {
                            "id": "hunt.10",
                            "name": "Hunt 10 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.15",
                            "name": "Hunt 15 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.25",
                            "name": "Hunt 25 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.35",
                            "name": "Hunt 35 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.50",
                            "name": "Hunt 50 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.75",
                            "name": "Hunt 75 Units"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "hunt.100",
                            "name": "Hunt 10 Units"
                        }
                    ]
                },
            ]
        },

        // "loot.by.rarity": {},
        // "loot.by.count": {},

        // "duel.by.count": {},

        "collect-gold.by.count": {
            "rarities": [
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
                            "id": "collect-gold.2500",
                            "name": "Collect 2.500 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.5000",
                            "name": "Collect 5.000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.10000",
                            "name": "Collect 10.000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.20000",
                            "name": "Collect 20.000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.50000",
                            "name": "Collect 50.000 gold"
                        }
                    ]
                },
                {
                    "quests": [
                        {
                            "id": "collect-gold.100000",
                            "name": "Collect 100.000 gold"
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