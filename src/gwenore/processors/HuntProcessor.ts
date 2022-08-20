import { HuntEventData } from "../../types/event";
import BaseProcessor from "./BaseProcessor";

export default class HuntProcessor extends BaseProcessor {

    getIncrementInTermsOfQuest() : number {
        return this.getIncrementCountByQuestId();
    }

    private getIncrementCountByQuestId() : number {
        if(this.isRarityBased()){
            return this.getIncrementCountByRarity();
        }
        else if(this.isIdBased()){
            return this.getIncrementCountById();
        }

        // if it falls back to here it's a quest like 'hunt.10' (quest without extra identifier)
        return 1;
    }

    private getIncrementCountById(){
        const currentId = (this.event.data as HuntEventData).mob.mobid;
        const questId = this.quest.id.split('.')[2];
        return (currentId === questId ? 1 : 0);
    }

    private getIncrementCountByRarity(){
        const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'ultimate'];
        const currentRarity = (this.event.data as HuntEventData).mob.rarity;
        const questRarity = rarityScale.indexOf(this.quest.id.split('.')[2]);
        return (currentRarity === questRarity ? 1 : 0);
    }
}