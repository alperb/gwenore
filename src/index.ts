import { config } from 'dotenv';
import express from 'express';

import Gwenore from './gwenore/gwenore';
import KafkaService from './gwenore/kafka/kafka';
import Logger from './gwenore/logger/logger';
import { CollectRewardType, CollectSource, EVENTTYPE } from './types/event';
import { LOGTYPE } from './types/log';
import { QuestCountRequest } from './types/requests';

config();

const app = express();


Gwenore.init();

KafkaService.connect().then(() => {
    KafkaService.consumer.run({
        eachMessage: async ({ message }) => {
            console.log({message})
            const request: QuestCountRequest = JSON.parse((message.value as Buffer).toString());
            Logger.log(LOGTYPE.INFO, `Received request for event (${request.event.name}) for snowflake (${request.event.snowflake})`);
            // Gwenore.process(request);
        },
    })
})

KafkaService.createTestProducer().then(() => {
    const request: QuestCountRequest = {
        event: {
            snowflake: "123456789",
            name: "collect-gold",
            channelId: "123456789",
            guildId: "123456789",
            characterId: "123456789",
            timestamp: 123456789,
            data: {
                rewardType: CollectRewardType.GOLD,
                rewards: [
                    {
                        type: CollectRewardType.GOLD,
                        value: 100
                    }
                ],
                source: CollectSource.LOOT
            }
        }
    }

    KafkaService.producer.send({
        topic: 'gwenore-harvester',
        messages: [
            { value: JSON.stringify(request) }
        ]
    })
})



app.listen(process.env.PORT, () => {
    Logger.log(LOGTYPE.INFO, `Server started on :${process.env.PORT}`);
})


