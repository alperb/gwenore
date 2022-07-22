import GwenoreEvent from "../../types/event";
import BaseProcessor from "../processors/BaseProcessor";
import CollectGoldProcessor from "../processors/CollectGold";
import HuntProcessor from "../processors/HuntProcessor";
import LootProcessor from "../processors/LootProcessor";

export default abstract class BaseHandler {
    event: GwenoreEvent;
    processors: Record<string, BaseProcessor> = {
        'collect-gold': new CollectGoldProcessor(),
        'hunt': new HuntProcessor(),
        'loot': new LootProcessor()
    };
    constructor(event: GwenoreEvent){
        this.event = event;
    }

    abstract handle(): Promise<void>;
}