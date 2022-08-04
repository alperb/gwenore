import { CollectGoldEventData } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class CollectExpProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest(): number {
        return (this.event.data as CollectGoldEventData).rewards.reduce((acc, reward) => {
            if(reward.type === 'exp'){
                return acc + reward.value;
            }
            return acc;
        }
        , 0);
    }
}