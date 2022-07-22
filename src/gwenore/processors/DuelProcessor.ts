import { DuelEventData } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class DuelProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest(): number {
        if(this.isWinBased()){
            return this.getIncrementByWinCondition();
        }
        return 1;
    }

    private getIncrementByWinCondition(): number {
        if((this.event.data as DuelEventData).result.winner === 0){
            return 1;
        }
        return 0;
    }
}