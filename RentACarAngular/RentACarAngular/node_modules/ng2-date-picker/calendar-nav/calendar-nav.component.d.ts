import { EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class CalendarNavComponent {
    label: string;
    isLabelClickable: boolean;
    showLeftNav: boolean;
    showLeftSecondaryNav: boolean;
    showRightNav: boolean;
    showRightSecondaryNav: boolean;
    leftNavDisabled: boolean;
    leftSecondaryNavDisabled: boolean;
    rightNavDisabled: boolean;
    rightSecondaryNavDisabled: boolean;
    showGoToCurrent: boolean;
    theme: string;
    onLeftNav: EventEmitter<null>;
    onLeftSecondaryNav: EventEmitter<null>;
    onRightNav: EventEmitter<null>;
    onRightSecondaryNav: EventEmitter<null>;
    onLabelClick: EventEmitter<null>;
    onGoToCurrent: EventEmitter<null>;
    leftNavClicked(): void;
    leftSecondaryNavClicked(): void;
    rightNavClicked(): void;
    rightSecondaryNavClicked(): void;
    labelClicked(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CalendarNavComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CalendarNavComponent, "dp-calendar-nav", never, { "isLabelClickable": "isLabelClickable"; "showLeftNav": "showLeftNav"; "showLeftSecondaryNav": "showLeftSecondaryNav"; "showRightNav": "showRightNav"; "showRightSecondaryNav": "showRightSecondaryNav"; "leftNavDisabled": "leftNavDisabled"; "leftSecondaryNavDisabled": "leftSecondaryNavDisabled"; "rightNavDisabled": "rightNavDisabled"; "rightSecondaryNavDisabled": "rightSecondaryNavDisabled"; "showGoToCurrent": "showGoToCurrent"; "label": "label"; "theme": "theme"; }, { "onLeftNav": "onLeftNav"; "onLeftSecondaryNav": "onLeftSecondaryNav"; "onRightNav": "onRightNav"; "onRightSecondaryNav": "onRightSecondaryNav"; "onLabelClick": "onLabelClick"; "onGoToCurrent": "onGoToCurrent"; }, never, never>;
}

//# sourceMappingURL=calendar-nav.component.d.ts.map