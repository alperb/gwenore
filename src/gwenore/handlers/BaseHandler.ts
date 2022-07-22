import GwenoreEvent from "../../types/event";
import BaseProcessor from "../processors/BaseProcessor";
import CollectGoldProcessor from "../processors/CollectGoldProcessor";
import DuelProcessor from "../processors/DuelProcessor";
import HuntProcessor from "../processors/HuntProcessor";
import LootProcessor from "../processors/LootProcessor";
import SellProcessor from "../processors/SellProcessor";

export default abstract class BaseHandler {
    event: GwenoreEvent;
    processors: Record<string, BaseProcessor> = {
        'collect-gold': new CollectGoldProcessor(),
        'hunt': new HuntProcessor(),
        'loot': new LootProcessor(),
        'duel': new DuelProcessor(),
        'sell': new SellProcessor()
    };
    constructor(event: GwenoreEvent){
        this.event = event;
    }

    abstract handle(): Promise<void>;
}