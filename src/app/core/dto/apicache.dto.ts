import { TDSSafeAny } from "tds-ui/shared/utility";
import { CoreGlobalConfig } from "../services";

export class CoreApiCacheDTO {
    Data!: TDSSafeAny;
    Expire!: number;

    public build(pData: TDSSafeAny, isPer: boolean = false): boolean {
        if(CoreGlobalConfig.cache.timerApi > 0 && CoreGlobalConfig.cache.timerPermission > 0) {
            this.Data = pData;
            if (!isPer)
                this.Expire = (new Date()).getTime() + CoreGlobalConfig.cache.timerApi * 1000;
            else {
                this.Expire = (new Date()).getTime() + CoreGlobalConfig.cache.timerPermission * 1000;
            }
            return true;
        }
        return false;
    }
    public checkExpire(): boolean {
        return this.Expire < (new Date()).getTime();
    }
    
}