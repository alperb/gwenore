import { Kafka, logLevel, Consumer, Producer } from 'kafkajs';
import { LOGTYPE } from '../../types/log';
import ServiceLogger from '../logger/ServiceLogger';

export default class KafkaService {
    static kafka: Kafka;
    static consumer: Consumer;
    static testproducer: Producer;
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
        ServiceLogger.log(LOGTYPE.INFO, "Kafka consumer connected.");
        await KafkaService.consumer.subscribe({ topic: 'gwenore-harvester', fromBeginning: true })
        ServiceLogger.log(LOGTYPE.INFO, "Kafka consumer subscribed to topic `gwenore-harvester`.");
    }

    static async createTestProducer(){
        KafkaService.testproducer = KafkaService.kafka.producer();
        await KafkaService.testproducer.connect();
        ServiceLogger.log(LOGTYPE.DEBUG, "Kafka test producer connected.");
        return KafkaService.testproducer;
    }
    
    static async createProducer(){
        KafkaService.producer = KafkaService.kafka.producer();
        await KafkaService.producer.connect();
        ServiceLogger.log(LOGTYPE.INFO, "Kafka Valenia producer connected.");
        return KafkaService.producer;
    }
}