import { config } from 'dotenv';
import Gwenore from './gwenore/Gwenore';

import KafkaService from './gwenore/kafka/KafkaService';
import ServiceLogger from './gwenore/logger/ServiceLogger';
import { CollectRewardType, CollectSource } from './types/event';
import { LOGTYPE } from './types/log';
import { QuestCountRequest } from './types/requests';

import GwenoreService from './grpc/server/GwenoreService';
import GwenoreTestClient from './service/GwenoreTestClient';

config();

const service = new GwenoreService(process.env.GRPC_HOST as string, process.env.GRPC_PORT as unknown as number)
const initializationProcesses = [
    Gwenore.init(),
    service.start(),
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
            "name" : "collect-gold",
            "channelId" : "759437907491684384",
            "snowflake" : "181348050436882432",
            "characterId" : "a678cebe-d3ca-4804-bf33-9f858507d815",
            "guildId" : "759433456475570207",
            "data": {
                "rewardType" : CollectRewardType.GOLD,
                "rewards" : [
                    {
                        "type" : CollectRewardType.GOLD,
                        "value": 100
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
    const testClient = new GwenoreTestClient();
    testClient.testGetProgress()
    .then(r => {
        console.log(r);
    })
})


