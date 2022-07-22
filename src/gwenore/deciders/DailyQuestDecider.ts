import BaseDecider from "./BaseDecider";
import DailyQuestConfig from '../config/daily';
import GwenoreEvent from "../../types/event";
import BaseHandler from "../handlers/BaseHandler";
import DailyQuestHandler from "../handlers/DailyQuestHandler";

export default class DailyQuestDecider extends BaseDecider {
    decide(event: GwenoreEvent): BaseHandler | undefined {
        for(const quest of Object.keys(DailyQuestConfig.types)){
            const splitted = quest.split('.');
            if(splitted[0] === event.name){
                return new DailyQuestHandler(event);
            }
        }
        return undefined;
    }
}