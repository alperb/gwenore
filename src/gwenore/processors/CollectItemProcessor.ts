import { CollectItemEventData, ITEMTYPE } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class CollectItemProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest(): number {
        if(this.isRarityBased()){
            return this.getItemCountByRarity();
        }
        return this.getTotalItemCount();
    }

    private getTotalItemCount(): number {
        return (this.event.data as CollectItemEventData).rewards.reduce((acc, reward) => {
            if(reward.item.type === ITEMTYPE.ARMOR || reward.item.type === ITEMTYPE.WEAPON){
                return acc + ((reward.count as number) ?? 1);
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
        console.log({event: (this.event.data as CollectItemEventData).rewards});
        return (this.event.data as CollectItemEventData).rewards.reduce((acc, reward) => {
            if((requiredRarity === reward.item.rarity) && (reward.item.type === ITEMTYPE.ARMOR || reward.item.type === ITEMTYPE.WEAPON)){
                return acc + ((reward.count as number) ?? 1);
            }
            return acc;
        }, 0);
    }
}