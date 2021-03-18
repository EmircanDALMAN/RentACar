import { TDrops, TOpens } from '../../types/poistions.type';
import * as ɵngcc0 from '@angular/core';
export declare class DomHelper {
    private static setYAxisPosition;
    private static setXAxisPosition;
    private static isTopInView;
    private static isBottomInView;
    private static isLeftInView;
    private static isRightInView;
    appendElementToPosition(config: IAppendToArgs): void;
    setElementPosition({ element, container, anchor, dimElem, drops, opens }: IAppendToArgs): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DomHelper, never>;
}
export interface IAppendToArgs {
    container: HTMLElement;
    element: HTMLElement;
    anchor: HTMLElement;
    dimElem: HTMLElement;
    drops: TDrops;
    opens: TOpens;
}

//# sourceMappingURL=dom-appender.service.d.ts.map