import { ProcessableSellingItem, SellEventData } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class SellProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest(): number {
        if(this.isRarityBased()){
            return this.getTotalSellingItemCountByRarity();
        }   
        return this.getTotalSellingItemCount();
    }

    private getTotalSellingItemCount(): number {
        return (this.event.data as SellEventData).sellingItems.reduce((acc: number, item: unknown[]) => {
            return acc + (item[1] as number);
        }, 0);
    }

    private getRarityIndex(){
        const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'ultimate'];
        return rarityScale.indexOf(this.quest.id.split('.')[2]);
    }

    private getTotalSellingItemCountByRarity(): number {
        const requiredRarity = this.getRarityIndex();

        return (this.event.data as SellEventData).sellingItems.reduce((acc: number, item: unknown[]) => {
            return (requiredRarity === (item[0] as ProcessableSellingItem).rarity) ? acc + (item[1] as number) : 0;
        }, 0);
    }
}