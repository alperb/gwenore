import { CollectItemEventData, ITEMTYPE } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class CollectGoldProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest(): number {
        if(this.isRarityBased()){
            return this.getItemCountByRarity();
        }
        return this.getTotalItemCount();
    }

    private getTotalItemCount(): number {
        return (this.event.data as CollectItemEventData).rewards.reduce((acc, reward) => {
            if(reward.type === ITEMTYPE.ARMOR || reward.type === ITEMTYPE.WEAPON){
                return acc + reward.count;
            }
            return acc;
        }, 0);
    }

    private getRarityIndex(){
        const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'ultimate'];
        return rarityScale.indexOf(this.quest.id.split('.')[2]);
    }

    private getItemCountByRarity(): number {
        const requiredRarity = this.getRarityIndex();

        return (this.event.data as CollectItemEventData).rewards.reduce((acc, reward) => {
            if((requiredRarity === reward.item.rarity) && (reward.type === ITEMTYPE.ARMOR || reward.type === ITEMTYPE.WEAPON)){
                return acc + reward.count;
            }
            return acc;
        }, 0);
    }
}