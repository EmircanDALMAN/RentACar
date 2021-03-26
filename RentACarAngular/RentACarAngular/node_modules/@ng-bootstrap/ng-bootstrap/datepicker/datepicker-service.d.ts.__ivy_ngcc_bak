import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDateStruct } from './ngb-date-struct';
import { DatepickerViewModel } from './datepicker-view-model';
import { Observable } from 'rxjs';
import { NgbDatepickerI18n } from './datepicker-i18n';
export interface DatepickerServiceInputs extends Partial<Required<Pick<DatepickerViewModel, 'dayTemplateData' | 'displayMonths' | 'disabled' | 'firstDayOfWeek' | 'focusVisible' | 'markDisabled' | 'maxDate' | 'minDate' | 'navigation' | 'outsideDays'>>> {
}
export declare class NgbDatepickerService {
    private _calendar;
    private _i18n;
    private _VALIDATORS;
    private _model$;
    private _dateSelect$;
    private _state;
    get model$(): Observable<DatepickerViewModel>;
    get dateSelect$(): Observable<NgbDate>;
    set(options: DatepickerServiceInputs): void;
    constructor(_calendar: NgbCalendar, _i18n: NgbDatepickerI18n);
    focus(date?: NgbDate | null): void;
    focusSelect(): void;
    open(date?: NgbDate | null): void;
    select(date?: NgbDate | null, options?: {
        emitEvent?: boolean;
    }): void;
    toValidDate(date?: NgbDateStruct | null, defaultValue?: NgbDate | null): NgbDate | null;
    getMonth(struct: NgbDateStruct): import("./datepicker-view-model").MonthViewModel;
    private _nextState;
    private _patchContexts;
    private _updateState;
}
