import { LootEventData } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class LootProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest() : number {
        return this.getIncrementCountByQuestId();
    }

    private getIncrementCountByQuestId() : number {
        if(this.isRarityBased()){
            return this.getIncrementCountByRarity();
        }

        // if it falls back to here it's a quest like 'loot.10' (quest without extra identifier)
        return 1;
    }

    private getIncrementCountByRarity(){
        const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'ultimate'];
        const currentRarity = (this.event.data as LootEventData).chest.rarity;
        const questRarity = rarityScale.indexOf(this.quest.id.split('.')[2]);
        return (currentRarity === questRarity ? 1 : 0);
    }
}