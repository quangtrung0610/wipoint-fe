import { TDSSafeAny } from "tds-ui/shared/utility";

export interface CoreDataResultDTO<T>{
    items:Array<T>;
    totalCount:number;
    aggregates:TDSSafeAny;
}
