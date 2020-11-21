export type RatName = string;

export type Rats = RatName[];

export interface RatData {
    width: number;
    height: number;
    nickname?: string;
}

export interface RatDataMap {
    [key: string]: RatData;
}

export type EmptyRatOption = {
    val: string;
    label: RatName;
};
