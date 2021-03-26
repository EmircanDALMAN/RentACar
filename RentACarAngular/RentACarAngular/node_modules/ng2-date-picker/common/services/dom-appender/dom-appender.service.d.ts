import { TDrops, TOpens } from '../../types/poistions.type';
export declare class DomHelper {
    private static setYAxisPosition;
    private static setXAxisPosition;
    private static isTopInView;
    private static isBottomInView;
    private static isLeftInView;
    private static isRightInView;
    appendElementToPosition(config: IAppendToArgs): void;
    setElementPosition({ element, container, anchor, dimElem, drops, opens }: IAppendToArgs): void;
}
export interface IAppendToArgs {
    container: HTMLElement;
    element: HTMLElement;
    anchor: HTMLElement;
    dimElem: HTMLElement;
    drops: TDrops;
    opens: TOpens;
}
