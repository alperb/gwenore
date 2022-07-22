import { config } from "dotenv";
import { Document, MongoClient, MongoClientOptions, WithId } from "mongodb";
import { LOGTYPE } from "../../types/log";
import { Player } from "../../types/types";
import ServiceLogger from "../logger/ServiceLogger";

config();

export default class MongoService {
    static isConnected = false;
    static client: MongoClient;
    static connectionOptions: MongoClientOptions;
    static certFile: string = (process.env.CERT_FILE as string);

    static async connect(){
        try{
            if(!MongoService.isConnected){
                MongoService.connectionOptions = {
                    tlsCertificateKeyFile: MongoService.certFile,
                    serverSelectionTimeoutMS: 5000
                }
                MongoService.client = new MongoClient(process.env.MONGO_URL as string, MongoService.connectionOptions);
    
                await MongoService.client.connect();
                MongoService.isConnected = true;
                ServiceLogger.log(LOGTYPE.INFO, "MongoDB connected");
            }
        }
        catch(e){
            ServiceLogger.log(LOGTYPE.ERROR, "MongoDB connection error", e);
        }
    }

    static async getInstance(){
        if(!MongoService.isConnected){
            await MongoService.connect();
        }
        return MongoService.client;
    }

    static async getPlayerPremiumStatus(player: Player){
        const db = await MongoService.getInstance();
        const collection = db.db('valenia').collection('players');
        const playerData = await collection.findOne({snowflake: player.snowflake});
        return (playerData as IPlayer).subscription.isActive ? (playerData as WithId<IPlayer>).subscription.current.type : -1;
    }

}

export interface IPlayer extends WithId<Document> {
    snowflake: string;
    subscription: {
        current: {
            end: number;
            start: number;
            type: number;
        },
        history: unknown[],
        isActive: boolean;
    };
}