import GwenoreEvent from "../../types/event";
import BaseDecider from "./base-decider";
import DailyQuestConfig from '../config/daily.json';
import DailyQuestHandler from "../handlers/dailyquest";

export default class DailyQuestDecider extends BaseDecider {

    constructor(){
        super();
    }

    shouldProcess(event: GwenoreEvent): DailyQuestHandler | undefined {
        for(const type of Object.keys(DailyQuestConfig.types)){
            const splitted = type.split('.');
            if(splitted[0] === event.name) return new DailyQuestHandler(event);
        }
        return undefined;
    }
}