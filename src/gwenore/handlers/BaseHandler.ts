import GwenoreEvent from "../../types/event";
import BaseProcessor from "../processors/BaseProcessor";
import CollectExpProcessor from "../processors/CollectExpProcessor";
import CollectGoldProcessor from "../processors/CollectGoldProcessor";
import CollectItemProcessor from "../processors/CollectItemProcessor";
import DuelProcessor from "../processors/DuelProcessor";
import HuntProcessor from "../processors/HuntProcessor";
import LootProcessor from "../processors/LootProcessor";
import SellProcessor from "../processors/SellProcessor";

export default abstract class BaseHandler {
    event: GwenoreEvent;
    processors: Record<string, BaseProcessor> = {
        'collect-gold': new CollectGoldProcessor(),
        'collect-exp': new CollectExpProcessor(),
        'collect-item': new CollectItemProcessor(),
        'hunt': new HuntProcessor(),
        'loot': new LootProcessor(),
        'duel': new DuelProcessor(),
        'sell': new SellProcessor(),
    };
    constructor(event: GwenoreEvent){
        this.event = event;
    }

    abstract handle(): Promise<void>;
}