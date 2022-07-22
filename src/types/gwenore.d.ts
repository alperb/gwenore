import { ProcessResult } from "./process";

declare interface Gwenore {
    on(event: 'dailyquestComplete', listener: (result: ProcessResult) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
}