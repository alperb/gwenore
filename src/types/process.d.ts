import GwenoreEvent from "./event";
import { SerializableQuest } from "./quests";

export interface ProcessResult {
    result: RESULTS;
    event: GwenoreEvent;
    quest: SerializableQuest
}

export const enum RESULTS {
    SUCCESS = "success",
    FAILURE = "failure",
    SUCCESS_WITH_REWARD = "success_with_reward"
}