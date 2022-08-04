import { config } from 'dotenv';
import Gwenore from './gwenore/Gwenore';

import KafkaService from './gwenore/kafka/KafkaService';
import ServiceLogger from './gwenore/logger/ServiceLogger';
import { LOGTYPE } from './types/log';
import { QuestCountRequest } from './types/requests';

import GwenoreService from './grpc/server/GwenoreService';

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
})


