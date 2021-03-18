import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { ITimeSelectConfig, ITimeSelectConfigInternal } from './time-select-config.model';
import * as ɵngcc0 from '@angular/core';
export declare type TimeUnit = 'hour' | 'minute' | 'second';
export declare const FIRST_PM_HOUR = 12;
export declare class TimeSelectService {
    private readonly utilsService;
    readonly DEFAULT_CONFIG: ITimeSelectConfigInternal;
    constructor(utilsService: UtilsService);
    getConfig(config: ITimeSelectConfig): ITimeSelectConfigInternal;
    getTimeFormat(config: ITimeSelectConfigInternal): string;
    getHours(config: ITimeSelectConfigInternal, t: Moment | null): string;
    getMinutes(config: ITimeSelectConfigInternal, t: Moment | null): string;
    getSeconds(config: ITimeSelectConfigInternal, t: Moment | null): string;
    getMeridiem(config: ITimeSelectConfigInternal, time: Moment): string;
    decrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): Moment;
    increase(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): Moment;
    toggleMeridiem(time: Moment): Moment;
    shouldShowDecrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): boolean;
    shouldShowIncrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): boolean;
    shouldShowToggleMeridiem(config: ITimeSelectConfigInternal, time: Moment): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TimeSelectService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TimeSelectService>;
}

//# sourceMappingURL=time-select.service.d.ts.map