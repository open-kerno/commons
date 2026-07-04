export declare const formats: (tag: string) => {
    logfmt: import("logform").Format;
    json: import("logform").Format;
};
interface Logger {
    debug: (message: string, data?: any, maskedFields?: string[]) => void;
    info: (message: string, data?: any, maskedFields?: string[]) => void;
    error: (message: string, err: any, data?: any, maskedFields?: string[]) => void;
}
declare const logger: (tag: string, loggerLevel?: string) => Logger;
export default logger;
