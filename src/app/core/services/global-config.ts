import { BehaviorSubject } from 'rxjs';
import { TDSSafeAny } from 'tds-ui/shared/utility';

export class CoreGlobalConfig {
       
    static Authen:{
        refreshTokenInProgress:boolean;
        refreshTokenSubject: BehaviorSubject<TDSSafeAny>;
    }    
    static cache: {
        timerPermission: number;
        timerApi: number;
    }
}