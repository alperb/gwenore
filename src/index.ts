import { config } from 'dotenv';

import Gwenore from './gwenore/Gwenore';
import KafkaService from './gwenore/kafka/KafkaService';
import ServiceLogger from './gwenore/logger/logger';
import { LOGTYPE } from './types/log';
import { QuestCountRequest } from './types/requests';

config();

const initializationProcesses = [
    Gwenore.init(),
    KafkaService.connect(),
    KafkaService.createProducer(),
    KafkaService.createTestProducer()
];

Promise.all(initializationProcesses).then(() => {
    KafkaService.consumer.run({
        eachMessage: async ({ message }) => {
            console.log({message})
            const request: QuestCountRequest = JSON.parse((message.value as Buffer).toString());
            ServiceLogger.log(LOGTYPE.INFO, `Received request for event (${request.event.name}) for snowflake (${request.event.snowflake})`);
            Gwenore.process(request);
        },
    })

    const request: QuestCountRequest = {
        event: {
            "name" : "loot",
            "channelId" : "759437907491684384",
            "snowflake" : "181348050436882432",
            "characterId" : "a678cebe-d3ca-4804-bf33-9f858507d815",
            "guildId" : "759433456475570207",
            "data" : {
                "result" : true,
                "rewards" : {

                },
                "chest" : {
                    "id" : "B1YS-HSB1-1J2",
                    "loot" : [
                        {
                            "type" : "gold",
                            "value" : 10000.0
                        },
                        {
                            "type" : "soulgem",
                            "value" : 5.0
                        },
                        {
                            "count" : 10.0,
                            "item" : {
                                "image" : {
                                    "inventory" : "item/inventory-items/keys/common_key.png",
                                    "original" : "item/utility/keys/common_key.png"
                                },
                                "soulbind" : {
                                    "player" : {
                                        "characterId" : "",
                                        "snowflake" : ""
                                    },
                                    "date" : 0.0,
                                    "isBindable" : false,
                                    "isBound" : false
                                },
                                "rarity" : 0.0,
                                "id" : "13671643-f4e9-4f22-9427-81db58bef8b5",
                                "isTradeable" : true,
                                "stack" : 24.0,
                                "emoji" : {
                                    "id" : "908078359660081235",
                                    "name" : "common_dungeonkey"
                                },
                                "placement" : "none",
                                "function" : [

                                ],
                                "name" : "Common Dungeon Key",
                                "set" : "",
                                "stats" : {

                                },
                                "type" : "dungeonkey",
                                "code" : "common.dungeonkey",
                                "durability" : 100.0
                            },
                            "type" : "key"
                        },
                        {
                            "count" : 1.0,
                            "item" : {
                                "set" : "elven.set",
                                "soulbind" : {
                                    "date" : 0.0,
                                    "isBindable" : true,
                                    "isBound" : false,
                                    "player" : {
                                        "characterId" : "",
                                        "snowflake" : ""
                                    }
                                },
                                "class" : "archer",
                                "code" : "elven.bow",
                                "function" : [

                                ],
                                "id" : "58e0a216-042f-43ff-bf28-8bbca5a37d53",
                                "isTradeable" : true,
                                "placement" : "righthand",
                                "type" : "weapon",
                                "durability" : 100.0,
                                "stack" : 1.0,
                                "name" : "Elven Bow",
                                "rarity" : 0.0,
                                "crafting" : [

                                ],
                                "deconstruct" : [

                                ],
                                "emoji" : {
                                    "id" : "864633393118576650"
                                },
                                "image" : {
                                    "inventory" : "item/inventory-items/elven/archer/bow.png",
                                    "original" : "item/set/elven/archer/bow.png",
                                    "wearings" : "item/wearings/elven/archer/bow.png"
                                },
                                "stats" : {
                                    "attack" : 16.0
                                }
                            },
                            "type" : "item"
                        }
                    ],
                    "passcode" : "C4FV",
                    "rarity" : -1.0,
                    "status" : {
                        "opendate" : 1653905308271.0,
                        "opener" : {
                            "snowflake" : "181348050436882432"
                        },
                        "channel" : "759437907491684384",
                        "currently" : "OPENED",
                        "guild" : "759433456475570207",
                        "isPremium" : false
                    }
                },
                "player" : {
                    "characterId" : "a678cebe-d3ca-4804-bf33-9f858507d815",
                    "snowflake" : "181348050436882432"
                }
            },
            "timestamp" : 1653905308695
        },
        
    }

    KafkaService.testproducer.send({
        topic: 'gwenore-harvester',
        messages: [
            { value: JSON.stringify(request) }
        ]
    })
})


