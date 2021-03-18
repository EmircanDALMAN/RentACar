import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { IDayTimeCalendarConfig } from './day-time-calendar-config.model';
import * as ɵngcc0 from '@angular/core';
export declare class DayTimeCalendarService {
    private utilsService;
    private dayCalendarService;
    private timeSelectService;
    readonly DEFAULT_CONFIG: IDayTimeCalendarConfig;
    constructor(utilsService: UtilsService, dayCalendarService: DayCalendarService, timeSelectService: TimeSelectService);
    getConfig(config: IDayTimeCalendarConfig): IDayTimeCalendarConfig;
    updateDay(current: Moment, day: Moment, config: IDayTimeCalendarConfig): Moment;
    updateTime(current: Moment, time: Moment): Moment;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DayTimeCalendarService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DayTimeCalendarService>;
}

//# sourceMappingURL=day-time-calendar.service.d.ts.map