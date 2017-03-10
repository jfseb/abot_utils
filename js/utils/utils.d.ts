export declare function deepFreeze(o: any): void;
export declare function listToQuotedCommaWord(list: string[], quote: string, word: string): string;
export declare function listToCommaAnd(list: string[], quote?: string): string;
export declare function listToCommaOr(list: string[], quote?: string): string;
export declare function listToQuotedCommaAnd(list: string[]): string;
export declare function listToQuotedCommaOr(list: string[]): string;
export declare function stripQuotes(str: string): string;
export declare function cloneDeep(item: any): any;
export declare const ArrayUtils: {
    indexOf: <T>(oMember: T, aArr: T[], fnComp: (a: T, b: T) => boolean) => number;
    presentIn: <T>(oMember: T, aArr: T[], fnComp?: (a: T, b: T) => boolean) => boolean;
    setMinus: <T>(aRR1: T[], aRR2: T[], fnComp?: (a: T, b: T) => boolean) => T[];
};
