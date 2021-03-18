import { EventEmitter } from '@angular/core';
import { IDatePickerConfig, IDatePickerConfigInternal } from './date-picker-config.model';
import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { IDayCalendarConfig } from '../day-calendar/day-calendar-config.model';
import { TimeSelectService } from '../time-select/time-select.service';
import { DayTimeCalendarService } from '../day-time-calendar/day-time-calendar.service';
import { ITimeSelectConfig } from '../time-select/time-select-config.model';
import { CalendarMode } from '../common/types/calendar-mode';
export declare class DatePickerService {
    private utilsService;
    private timeSelectService;
    private daytimeCalendarService;
    readonly onPickerClosed: EventEmitter<null>;
    private defaultConfig;
    constructor(utilsService: UtilsService, timeSelectService: TimeSelectService, daytimeCalendarService: DayTimeCalendarService);
    getConfig(config: IDatePickerConfig, mode?: CalendarMode): IDatePickerConfigInternal;
    getDayConfigService(pickerConfig: IDatePickerConfig): IDayCalendarConfig;
    getDayTimeConfigService(pickerConfig: IDatePickerConfig): ITimeSelectConfig;
    getTimeConfigService(pickerConfig: IDatePickerConfig): ITimeSelectConfig;
    pickerClosed(): void;
    isValidInputDateValue(value: string, config: IDatePickerConfig): boolean;
    convertInputValueToMomentArray(value: string, config: IDatePickerConfig): Moment[];
    private getDefaultFormatByMode;
}
