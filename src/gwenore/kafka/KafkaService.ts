import { Kafka, logLevel, Consumer, Producer } from 'kafkajs';
import { LOGTYPE } from '../../types/log';
import Logger from '../logger/logger';

export default class KafkaService {
    static kafka: Kafka;
    static consumer: Consumer;
    static producer: Producer;

    static async connect(){
        KafkaService.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT as string,
            brokers: [process.env.KAFKA_BROKER as string],
            logLevel: process.env.NODE_ENV == 'dev' ? logLevel.DEBUG : logLevel.NOTHING,
            retry: {
                initialRetryTime: 300,
                retries: 3,
                factor: 1.2,
                maxRetryTime: 1000
            }
        });
        KafkaService.consumer = KafkaService.kafka.consumer({ groupId: 'harvesters' });
        await KafkaService.consumer.connect()
        Logger.log(LOGTYPE.INFO, "Kafka consumer connected.");
        await KafkaService.consumer.subscribe({ topic: 'gwenore-harvester', fromBeginning: true })
        Logger.log(LOGTYPE.INFO, "Kafka consumer subscribed to topic `gwenore-harvester`.");
    }

    static async createTestProducer(){
        KafkaService.producer = KafkaService.kafka.producer();
        await KafkaService.producer.connect();
        return KafkaService.producer;
    }
}