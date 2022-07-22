import GwenoreEvent from "../../types/event";
import BaseProcessor from "../processors/BaseProcessor";
import CollectGoldProcessor from "../processors/CollectGold";
import HuntProcessor from "../processors/HuntProcessor";

export default abstract class BaseHandler {
    event: GwenoreEvent;
    processors: Record<string, BaseProcessor> = {
        'collect-gold': new CollectGoldProcessor(),
        'hunt': new HuntProcessor()
    };
    constructor(event: GwenoreEvent){
        this.event = event;
    }

    abstract handle(): Promise<void>;
}