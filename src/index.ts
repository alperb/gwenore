import { config } from 'dotenv';

import Gwenore from './gwenore/Gwenore';
import KafkaService from './gwenore/kafka/KafkaService';
import Logger from './gwenore/logger/logger';
import { LOGTYPE } from './types/log';
import { QuestCountRequest } from './types/requests';

config();


Gwenore.init();

KafkaService.connect().then(() => {
    KafkaService.consumer.run({
        eachMessage: async ({ message }) => {
            console.log({message})
            const request: QuestCountRequest = JSON.parse((message.value as Buffer).toString());
            Logger.log(LOGTYPE.INFO, `Received request for event (${request.event.name}) for snowflake (${request.event.snowflake})`);
            Gwenore.process(request);
        },
    })
})

KafkaService.createTestProducer().then(() => {
    const request: QuestCountRequest = {
        event: {
            "name" : "hunt",
            "channelId" : "979623062066585640",
            "snowflake" : "186904949106409472",
            "characterId" : "c20b743a-797b-4aad-9ba2-129e59ae8a56",
            "guildId" : "759433456475570207",
            "data" : {
                "autoFeatures" : {
                    "autorepair" : false,
                    "autorevive" : ""
                },
                "mob" : {
                    "rarity" : 0.0,
                    "status" : {
                        "channel" : "979623062066585640",
                        "currently" : "FOUGHT",
                        "duelDate" : 1654224074088.0,
                        "fighting" : {
                            "snowflake" : "186904949106409472"
                        },
                        "guild" : "759433456475570207",
                        "isPremium" : false
                    },
                    "timestamp" : "1654224051339",
                    "id" : "JB2J-0VW4-8T1",
                    "loot" : [
                        {
                            "type" : "exp",
                            "value" : 198.0
                        },
                        {
                            "type" : "gold",
                            "value" : 12.0
                        },
                        {
                            "type" : "key",
                            "count" : 1.0,
                            "item" : {
                                "name" : "Common Dungeon Key",
                                "rarity" : 0.0,
                                "stack" : 24.0,
                                "stats" : {

                                },
                                "id" : "3d791ab7-535e-4c14-b80f-1662f949f761",
                                "image" : {
                                    "original" : "item/utility/keys/common_key.png",
                                    "inventory" : "item/inventory-items/keys/common_key.png"
                                },
                                "isTradeable" : true,
                                "placement" : "none",
                                "type" : "dungeonkey",
                                "function" : [

                                ],
                                "durability" : 100.0,
                                "set" : "",
                                "code" : "common.dungeonkey",
                                "soulbind" : {
                                    "date" : 0.0,
                                    "isBindable" : false,
                                    "isBound" : false,
                                    "player" : {
                                        "characterId" : "",
                                        "snowflake" : ""
                                    }
                                },
                                "emoji" : {
                                    "id" : "908078359660081235",
                                    "name" : "common_dungeonkey"
                                }
                            }
                        },
                        {
                            "count" : 2.0,
                            "item" : {
                                "emoji" : {
                                    "id" : "962493462505222164"
                                },
                                "id" : "d4ea274c-c31c-42c4-bdf5-f26bbc079055",
                                "stack" : 12.0,
                                "stats" : {

                                },
                                "code" : "common.armorgem",
                                "durability" : 100.0,
                                "image" : {
                                    "inventory" : "item/inventory-items/gems/armor/common.png",
                                    "original" : "item/inventory-items/gems/armor/common.png"
                                },
                                "placement" : "none",
                                "set" : "",
                                "type" : "armorgem",
                                "isTradeable" : true,
                                "rarity" : 0.0,
                                "function" : [

                                ],
                                "name" : "Common Armor Gem",
                                "soulbind" : {
                                    "date" : 0.0,
                                    "isBindable" : false,
                                    "isBound" : false,
                                    "player" : {
                                        "characterId" : "",
                                        "snowflake" : ""
                                    }
                                }
                            },
                            "type" : "armorgem"
                        },
                        {
                            "item" : {
                                "crafting" : [

                                ],
                                "rarity" : 0.0,
                                "soulbind" : {
                                    "date" : 0.0,
                                    "isBindable" : true,
                                    "isBound" : false,
                                    "player" : {
                                        "characterId" : "",
                                        "snowflake" : ""
                                    }
                                },
                                "function" : [

                                ],
                                "stack" : 1.0,
                                "stats" : {
                                    "attack" : 15.0
                                },
                                "class" : "archer",
                                "deconstruct" : [

                                ],
                                "isTradeable" : true,
                                "name" : "Elven Bow",
                                "type" : "weapon",
                                "code" : "elven.bow",
                                "durability" : 100.0,
                                "emoji" : {
                                    "id" : "864633393118576650"
                                },
                                "id" : "341322d5-4934-4d6a-94df-6d05d9fa91e0",
                                "image" : {
                                    "inventory" : "item/inventory-items/elven/archer/bow.png",
                                    "original" : "item/set/elven/archer/bow.png",
                                    "wearings" : "item/wearings/elven/archer/bow.png"
                                },
                                "placement" : "righthand",
                                "set" : "elven.set"
                            },
                            "type" : "item"
                        }
                    ],
                    "mobid" : "goblin_bandit",
                    "passcode" : "G5NQ"
                },
                "player" : {
                    "characterId" : "c20b743a-797b-4aad-9ba2-129e59ae8a56",
                    "snowflake" : "186904949106409472"
                },
                "result" : 0.0,
                "rewards" : {
                    "0" : {
                        "value" : 198.0,
                        "type" : "exp"
                    },
                    "1" : {
                        "type" : "gold",
                        "value" : 12.0
                    },
                    "2" : {
                        "count" : 1.0,
                        "item" : {
                            "placement" : "none",
                            "soulbind" : {
                                "player" : {
                                    "characterId" : "",
                                    "snowflake" : ""
                                },
                                "date" : 0.0,
                                "isBindable" : false,
                                "isBound" : false
                            },
                            "stack" : 24.0,
                            "type" : "dungeonkey",
                            "code" : "common.dungeonkey",
                            "isTradeable" : true,
                            "name" : "Common Dungeon Key",
                            "emoji" : {
                                "name" : "common_dungeonkey",
                                "id" : "908078359660081235"
                            },
                            "id" : "3d791ab7-535e-4c14-b80f-1662f949f761",
                            "set" : "",
                            "image" : {
                                "inventory" : "item/inventory-items/keys/common_key.png",
                                "original" : "item/utility/keys/common_key.png"
                            },
                            "stats" : {

                            },
                            "durability" : 100.0,
                            "function" : [

                            ],
                            "rarity" : 0.0
                        },
                        "type" : "key"
                    },
                    "3" : {
                        "count" : 2.0,
                        "item" : {
                            "code" : "common.armorgem",
                            "isTradeable" : true,
                            "stats" : {

                            },
                            "set" : "",
                            "durability" : 100.0,
                            "emoji" : {
                                "id" : "962493462505222164"
                            },
                            "placement" : "none",
                            "rarity" : 0.0,
                            "image" : {
                                "inventory" : "item/inventory-items/gems/armor/common.png",
                                "original" : "item/inventory-items/gems/armor/common.png"
                            },
                            "soulbind" : {
                                "date" : 0.0,
                                "isBindable" : false,
                                "isBound" : false,
                                "player" : {
                                    "characterId" : "",
                                    "snowflake" : ""
                                }
                            },
                            "type" : "armorgem",
                            "function" : [

                            ],
                            "id" : "d4ea274c-c31c-42c4-bdf5-f26bbc079055",
                            "name" : "Common Armor Gem",
                            "stack" : 12.0
                        },
                        "type" : "armorgem"
                    },
                    "4" : {
                        "item" : {
                            "set" : "elven.set",
                            "stats" : {
                                "attack" : 15.0
                            },
                            "durability" : 100.0,
                            "emoji" : {
                                "id" : "864633393118576650"
                            },
                            "placement" : "righthand",
                            "isTradeable" : true,
                            "rarity" : 0.0,
                            "soulbind" : {
                                "date" : 0.0,
                                "isBindable" : true,
                                "isBound" : false,
                                "player" : {
                                    "characterId" : "",
                                    "snowflake" : ""
                                }
                            },
                            "code" : "elven.bow",
                            "function" : [

                            ],
                            "image" : {
                                "inventory" : "item/inventory-items/elven/archer/bow.png",
                                "original" : "item/set/elven/archer/bow.png",
                                "wearings" : "item/wearings/elven/archer/bow.png"
                            },
                            "id" : "341322d5-4934-4d6a-94df-6d05d9fa91e0",
                            "stack" : 1.0,
                            "type" : "weapon",
                            "name" : "Elven Bow",
                            "class" : "archer",
                            "crafting" : [

                            ],
                            "deconstruct" : [

                            ]
                        },
                        "type" : "item"
                    }
                },
                "stats" : [
                    [
                        {
                            "skillUseCounts" : [
                                {
                                    "count" : 2.0,
                                    "skillId" : 2000.0
                                }
                            ],
                            "snowflake" : "186904949106409472",
                            "totalDamageDone" : {
                                "effect" : 0.0,
                                "skill" : 0.0
                            }
                        }
                    ],
                    [
                        {
                            "totalDamageDone" : {
                                "effect" : 0.0,
                                "skill" : 0.0
                            },
                            "characterId" : "IRRELEVANT",
                            "skillUseCounts" : [
                                {
                                    "count" : 1.0,
                                    "skillId" : 69007.0
                                },
                                {
                                    "count" : 0.0,
                                    "skillId" : 69008.0
                                },
                                {
                                    "count" : 0.0,
                                    "skillId" : 69009.0
                                }
                            ],
                            "snowflake" : "IRRELEVANT"
                        }
                    ]
                ]
            },
            "timestamp" : 1654224096121
        },
        
    }

    KafkaService.producer.send({
        topic: 'gwenore-harvester',
        messages: [
            { value: JSON.stringify(request) }
        ]
    })
})


