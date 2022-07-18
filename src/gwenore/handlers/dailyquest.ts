import GwenoreEvent from "../../types/event";
import QuestHandler from "./handler";

export default class DailyQuestHandler extends QuestHandler {
    constructor(event: GwenoreEvent) {
        super(event);
    }
    
    apply(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}