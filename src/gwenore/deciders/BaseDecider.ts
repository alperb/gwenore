import GwenoreEvent from "../../types/event";
import BaseHandler from "../handlers/BaseHandler";

export default abstract class BaseDecider {
    abstract decide(event: GwenoreEvent): BaseHandler | undefined;
}