import { EventEmitter } from '@angular/core';
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
}
