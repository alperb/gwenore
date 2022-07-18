export default interface Log {
    time: number;
    type: LOGTYPE,
    message: string,
    error?: Error,
    details?: unknown[]
}

export const enum LOGTYPE {
    INFO = "info",
    WARN = "warning",
    ERROR = "error",
    DEBUG = "debug",
    DEFAULT = "default"
}