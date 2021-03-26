/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DateRange } from '@angular/material/datepicker';
import { NgxMatCalendarBody, NgxMatCalendarCell, NgxMatCalendarUserEvent } from './calendar-body';
import { NgxMatDateFormats } from './core/date-formats';
import { NgxMatDateAdapter } from './core/date-adapter';
/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
export declare class NgxMatYearView<D> implements AfterContentInit, OnDestroy {
    private _changeDetectorRef;
    private _dateFormats;
    _dateAdapter: NgxMatDateAdapter<D>;
    private _dir?;
    private _rerenderSubscription;
    /** The date to display in this year view (everything other than the year is ignored). */
    get activeDate(): D;
    set activeDate(value: D);
    private _activeDate;
    /** The currently selected date. */
    get selected(): DateRange<D> | D | null;
    set selected(value: DateRange<D> | D | null);
    private _selected;
    /** The minimum selectable date. */
    get minDate(): D | null;
    set minDate(value: D | null);
    private _minDate;
    /** The maximum selectable date. */
    get maxDate(): D | null;
    set maxDate(value: D | null);
    private _maxDate;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D) => boolean;
    /** Emits when a new month is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** Emits the selected month. This doesn't imply a change on the selected date */
    readonly monthSelected: EventEmitter<D>;
    /** Emits when any date is activated. */
    readonly activeDateChange: EventEmitter<D>;
    /** The body of calendar table */
    _matCalendarBody: NgxMatCalendarBody;
    /** Grid of calendar cells representing the months of the year. */
    _months: NgxMatCalendarCell[][];
    /** The label for this year (e.g. "2017"). */
    _yearLabel: string;
    /** The month in this year that today falls on. Null if today is in a different year. */
    _todayMonth: number | null;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     */
    _selectedMonth: number | null;
    constructor(_changeDetectorRef: ChangeDetectorRef, _dateFormats: NgxMatDateFormats, _dateAdapter: NgxMatDateAdapter<D>, _dir?: Directionality);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Handles when a new month is selected. */
    _monthSelected(event: NgxMatCalendarUserEvent<number>): void;
    /** Handles keydown events on the calendar body when calendar is in year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    /** Initializes this year view. */
    _init(): void;
    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell(): void;
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private _getMonthInCurrentYear;
    /** Creates an MatCalendarCell for the given month. */
    private _createCellForMonth;
    /** Whether the given month is enabled. */
    private _shouldEnableMonth;
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    private _isYearAndMonthAfterMaxDate;
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    private _isYearAndMonthBeforeMinDate;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Determines whether the user has the RTL layout direction. */
    private _isRtl;
    /** Sets the currently-selected month based on a model value. */
    private _setSelectedMonth;
}
