import { ECalendarValue } from '../../types/calendar-value-enum';
import { SingleCalendarValue } from '../../types/single-calendar-value';
import { Moment, unitOfTime } from 'moment';
import { CalendarValue } from '../../types/calendar-value';
import { IDate } from '../../models/date.model';
import { CalendarMode } from '../../types/calendar-mode';
import { DateValidator } from '../../types/validator.type';
import { ICalendarInternal } from '../../models/calendar.model';
import * as ɵngcc0 from '@angular/core';
export interface DateLimits {
    minDate?: SingleCalendarValue;
    maxDate?: SingleCalendarValue;
    minTime?: SingleCalendarValue;
    maxTime?: SingleCalendarValue;
}
export declare class UtilsService {
    static debounce(func: Function, wait: number): () => void;
    createArray(size: number): number[];
    convertToMoment(date: SingleCalendarValue, format: string): Moment;
    isDateValid(date: string, format: string): boolean;
    getDefaultDisplayDate(current: Moment, selected: Moment[], allowMultiSelect: boolean, minDate: Moment): Moment;
    getInputType(value: CalendarValue, allowMultiSelect: boolean): ECalendarValue;
    convertToMomentArray(value: CalendarValue, config: {
        allowMultiSelect?: boolean;
        format?: string;
    }): Moment[];
    convertFromMomentArray(format: string, value: Moment[], convertTo: ECalendarValue): CalendarValue;
    convertToString(value: CalendarValue, format: string): string;
    clearUndefined<T>(obj: T): T;
    updateSelected(isMultiple: boolean, currentlySelected: Moment[], date: IDate, granularity?: unitOfTime.Base): Moment[];
    closestParent(element: HTMLElement, selector: string): HTMLElement;
    onlyTime(m: Moment): Moment;
    granularityFromType(calendarType: CalendarMode): unitOfTime.Base;
    createValidator({ minDate, maxDate, minTime, maxTime }: DateLimits, format: string, calendarType: CalendarMode): DateValidator;
    datesStringToStringArray(value: string): string[];
    getValidMomentArray(value: string, format: string): Moment[];
    shouldShowCurrent(showGoToCurrent: boolean, mode: CalendarMode, min: Moment, max: Moment): boolean;
    isDateInRange(date: Moment, from: Moment, to: Moment): boolean;
    convertPropsToMoment(obj: {
        [key: string]: any;
    }, format: string, props: string[]): void;
    shouldResetCurrentView<T extends ICalendarInternal>(prevConf: T, currentConf: T): boolean;
    getNativeElement(elem: HTMLElement | string): HTMLElement;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<UtilsService, never>;
}

//# sourceMappingURL=utils.service.d.ts.map