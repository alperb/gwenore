import * as grpc from "@grpc/grpc-js";
import { GetProgressRequest } from "../grpc/proto.output/GwenorePackage/GetProgressRequest";
import { GetProgressResponse } from "../grpc/proto.output/GwenorePackage/GetProgressResponse";
import { QuestProgress } from "../grpc/proto.output/GwenorePackage/QuestProgress";
import RedisService from "../gwenore/database/RedisService";
import Gwenore from "../gwenore/Gwenore";
import { SerializableQuest } from "../types/quests";

export default class GwenoreServiceHandler {

    static async getQuestProgressByQuestId(questId: string, snowflake: string){
        const quest_key = `dailyquests_${snowflake}_${questId}`;
        const progress = (await RedisService.get(quest_key));
        if(progress !== null) return parseInt(progress);
        else return 0;
    }

    static async getProgress(req: grpc.ServerUnaryCall<GetProgressRequest, GetProgressResponse>, res: grpc.sendUnaryData<GetProgressResponse>): Promise<void> {
        try{
            const snowflake = (req.request.snowflake as string);
            const quests = await Gwenore.managers['dailyquest'].getQuests({ snowflake });
            console.log(quests);
            if(quests.result === 'success'){
                const questArr: QuestProgress[] = [];
                for(const key of Object.keys(quests.quests as Record<string, SerializableQuest>)){
                    const q = (quests.quests as Record<string, SerializableQuest>)[key];
                    const quest = await GwenoreServiceHandler.getQuestProgressByQuestId(q.id, snowflake);
                    questArr.push({
                        id: q.id,
                        name: q.name,
                        current: quest
                    });
                }
                const response: GetProgressResponse = {
                    status: 'success',
                    progress: questArr
                }
                res(null, response);
            }
            else {
                const response: GetProgressResponse = {
                    status: 'error',
                    error: quests.error as string
                }
                res(null, response);
            }
        }
        catch(e){
            const response: GetProgressResponse = {
                status: 'error',
                error: (e as Error).message
            }
            res(null, response);
        }
    }
}