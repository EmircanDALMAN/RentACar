import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { IMonth } from './month.model';
import { IMonthCalendarConfig, IMonthCalendarConfigInternal } from './month-calendar-config';
import * as ɵngcc0 from '@angular/core';
export declare class MonthCalendarService {
    private utilsService;
    readonly DEFAULT_CONFIG: IMonthCalendarConfigInternal;
    constructor(utilsService: UtilsService);
    getConfig(config: IMonthCalendarConfig): IMonthCalendarConfigInternal;
    generateYear(config: IMonthCalendarConfig, year: Moment, selected?: Moment[]): IMonth[][];
    isMonthDisabled(date: Moment, config: IMonthCalendarConfig): boolean;
    shouldShowLeft(min: Moment, currentMonthView: Moment): boolean;
    shouldShowRight(max: Moment, currentMonthView: Moment): boolean;
    getHeaderLabel(config: IMonthCalendarConfig, year: Moment): string;
    getMonthBtnText(config: IMonthCalendarConfig, month: Moment): string;
    getMonthBtnCssClass(config: IMonthCalendarConfig, month: Moment): string;
    private validateConfig;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MonthCalendarService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MonthCalendarService>;
}

//# sourceMappingURL=month-calendar.service.d.ts.map