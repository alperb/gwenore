import GwenoreEvent from "../../types/event";

export default abstract class QuestHandler {
    event: GwenoreEvent;
    constructor(event: GwenoreEvent){
        this.event = event;
    }

    abstract apply(): Promise<void>;
}