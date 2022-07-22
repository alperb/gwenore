import { config } from 'dotenv';
import Gwenore from './gwenore/gwenore';

import KafkaService from './gwenore/kafka/KafkaService';
import ServiceLogger from './gwenore/logger/ServiceLogger';
import { CollectRewardType, CollectSource } from './types/event';
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

    const req: QuestCountRequest = {
        event: {
            "name" : "collect-gold",
            "channelId" : "759437907491684384",
            "snowflake" : "181348050436882432",
            "characterId" : "a678cebe-d3ca-4804-bf33-9f858507d815",
            "guildId" : "759433456475570207",
            "data" : {
                "rewardType" : CollectRewardType.GOLD,
                "rewards" : [
                    {
                        "type" : CollectRewardType.GOLD,
                        "value" : 10000.0
                    }
                ],
                "source" : CollectSource.LOOT
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


