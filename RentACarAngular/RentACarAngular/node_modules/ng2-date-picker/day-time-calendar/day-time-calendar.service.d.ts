import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { IDayTimeCalendarConfig } from './day-time-calendar-config.model';
export declare class DayTimeCalendarService {
    private utilsService;
    private dayCalendarService;
    private timeSelectService;
    readonly DEFAULT_CONFIG: IDayTimeCalendarConfig;
    constructor(utilsService: UtilsService, dayCalendarService: DayCalendarService, timeSelectService: TimeSelectService);
    getConfig(config: IDayTimeCalendarConfig): IDayTimeCalendarConfig;
    updateDay(current: Moment, day: Moment, config: IDayTimeCalendarConfig): Moment;
    updateTime(current: Moment, time: Moment): Moment;
}
