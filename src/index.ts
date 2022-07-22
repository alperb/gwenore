import { config } from 'dotenv';
import Gwenore from './gwenore/Gwenore';

import KafkaService from './gwenore/kafka/KafkaService';
import ServiceLogger from './gwenore/logger/ServiceLogger';
import { CollectRewardType, CollectSource, ITEMTYPE } from './types/event';
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
            const request: QuestCountRequest = JSON.parse((message.value as Buffer).toString());
            ServiceLogger.log(LOGTYPE.INFO, `Received request for event (${request.event.name}) for snowflake (${request.event.snowflake})`);
            Gwenore.process(request);
        },
    })

    const req: QuestCountRequest = {
        event: {
            "name" : "collect-item",
            "channelId" : "759437907491684384",
            "snowflake" : "181348050436882432",
            "characterId" : "a678cebe-d3ca-4804-bf33-9f858507d815",
            "guildId" : "759433456475570207",
            "data": {
                "rewardType" : CollectRewardType.ITEM,
                "rewards" : [
                    {
                        "type" : "key",
                        "count" : 5.0,
                        "item" : {
                            "code" : "epic.dungeonkey",
                            "isTradeable" : true,
                            "rarity" : 0.0,
                            "durability" : 100.0,
                            "placement" : "none",
                            "stats" : {

                            },
                            "set" : "",
                            "soulbind" : {
                                "isBindable" : false,
                                "isBound" : false,
                                "player" : {
                                    "characterId" : "",
                                    "snowflake" : ""
                                },
                                "date" : 0.0
                            },
                            "type" : ITEMTYPE.ARMOR,
                            "emoji" : {
                                "id" : "908078398734205019",
                                "name" : "epic_dungeonkey"
                            },
                            "id" : "59274d1d-109f-40dc-9aa7-1596d65f1491",
                            "image" : {
                                "inventory" : "item/inventory-items/keys/epic_key.png",
                                "original" : "item/utility/keys/epic_key.png"
                            },
                            "name" : "Epic Dungeon Key",
                            "function" : [

                            ],
                            "stack" : 24.0
                        }
                    }
                ],
                "source" : CollectSource.HUNT
            },
            "timestamp" : 1653905308695
        },
        
    }

    KafkaService.testproducer.send({
        topic: 'gwenore-harvester',
        messages: [
            { value: JSON.stringify(req) }
        ]
    })
})


