import GwenoreEvent from "./event";

export interface ProcessResult {
    result: RESULTS;
    event: GwenoreEvent;
}

export const enum RESULTS {
    SUCCESS = "success",
    FAILURE = "failure",
    SUCCESS_WITH_REWARD = "success_with_reward"
}