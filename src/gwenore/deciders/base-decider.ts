import GwenoreEvent from "../../types/event";
import QuestHandler from "../handlers/handler";

export default abstract class BaseDecider {
    abstract shouldProcess(event: GwenoreEvent): QuestHandler | undefined;
}