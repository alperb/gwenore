import { config } from "dotenv";
import { MongoClient, MongoClientOptions } from "mongodb";
import { LOGTYPE } from "../../types/log";
import Logger from "../logger/logger";
config();

export default class MongoService {
    static isConnected = false;
    static client: MongoClient;
    static connectionOptions: MongoClientOptions;
    static certFile: string = (process.env.NODE_ENV == 'prod') ? (process.env.CERT_FILE as string) : (process.env.DEV_CERT_FILE as string);

    static async connect(){
        try{
            if(!MongoService.isConnected){

                // TODO: remove comments here when you are ready to use the real mongo connection
                // MongoService.connectionOptions = {
                //     tlsCertificateKeyFile: MongoService.certFile,
                //     serverSelectionTimeoutMS: 5000
                // }
                // MongoService.client = new MongoClient(process.env.MONGO_URL as string, MongoService.connectionOptions);
    
                // await MongoService.client.connect();
                MongoService.isConnected = true;
                Logger.log(LOGTYPE.INFO, "MongoDB connected");
            }
        }
        catch(e){
            Logger.log(LOGTYPE.ERROR, "MongoDB connection error", e);
        }
    }

    static async getInstance(){
        if(!MongoService.isConnected){
            await MongoService.connect();
        }
        return MongoService.client;
    }

}