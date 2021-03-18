import { UtilsService } from '../common/services/utils/utils.service';
import { IDatePickerDirectiveConfig } from './date-picker-directive-config.model';
import { ElementRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class DatePickerDirectiveService {
    utilsService: UtilsService;
    constructor(utilsService: UtilsService);
    convertToHTMLElement(attachTo: ElementRef | string, baseElement: HTMLElement): HTMLElement;
    getConfig(config?: IDatePickerDirectiveConfig, baseElement?: ElementRef, attachTo?: ElementRef | string): IDatePickerDirectiveConfig;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DatePickerDirectiveService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<DatePickerDirectiveService>;
}

//# sourceMappingURL=date-picker-directive.service.d.ts.map