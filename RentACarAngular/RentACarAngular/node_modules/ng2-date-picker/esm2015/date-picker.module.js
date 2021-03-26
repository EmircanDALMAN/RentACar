import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerDirective } from './date-picker/date-picker.directive';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { TimeSelectComponent } from './time-select/time-select.component';
import { CalendarNavComponent } from './calendar-nav/calendar-nav.component';
import { DayTimeCalendarComponent } from './day-time-calendar/day-time-calendar.component';
export { DatePickerComponent } from './date-picker/date-picker.component';
export { DatePickerDirective } from './date-picker/date-picker.directive';
export { DayCalendarComponent } from './day-calendar/day-calendar.component';
export { DayTimeCalendarComponent } from './day-time-calendar/day-time-calendar.component';
export { TimeSelectComponent } from './time-select/time-select.component';
export { MonthCalendarComponent } from './month-calendar/month-calendar.component';
export class DpDatePickerModule {
}
DpDatePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DatePickerComponent,
                    DatePickerDirective,
                    DayCalendarComponent,
                    MonthCalendarComponent,
                    CalendarNavComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ],
                entryComponents: [
                    DatePickerComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    DatePickerComponent,
                    DatePickerDirective,
                    MonthCalendarComponent,
                    DayCalendarComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9saWIvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBRXpGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzNFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBNEJqRixNQUFNLE9BQU8sa0JBQWtCOzs7WUExQjlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsd0JBQXdCO2lCQUN6QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsc0JBQXNCO29CQUN0QixvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsd0JBQXdCO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGF0ZVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEYXRlUGlja2VyRGlyZWN0aXZlfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0RheUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7TW9udGhDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci9tb250aC1jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHtUaW1lU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NhbGVuZGFyTmF2Q29tcG9uZW50fSBmcm9tICcuL2NhbGVuZGFyLW5hdi9jYWxlbmRhci1uYXYuY29tcG9uZW50JztcbmltcG9ydCB7RGF5VGltZUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5cbmV4cG9ydCB7RGF0ZVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuZXhwb3J0IHtEYXRlUGlja2VyRGlyZWN0aXZlfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmRpcmVjdGl2ZSc7XG5leHBvcnQge0RheUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmV4cG9ydCB7RGF5VGltZUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5leHBvcnQge1RpbWVTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50JztcbmV4cG9ydCB7TW9udGhDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci9tb250aC1jYWxlbmRhci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIERhdGVQaWNrZXJEaXJlY3RpdmUsXG4gICAgRGF5Q2FsZW5kYXJDb21wb25lbnQsXG4gICAgTW9udGhDYWxlbmRhckNvbXBvbmVudCxcbiAgICBDYWxlbmRhck5hdkNvbXBvbmVudCxcbiAgICBUaW1lU2VsZWN0Q29tcG9uZW50LFxuICAgIERheVRpbWVDYWxlbmRhckNvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgRGF0ZVBpY2tlckRpcmVjdGl2ZSxcbiAgICBNb250aENhbGVuZGFyQ29tcG9uZW50LFxuICAgIERheUNhbGVuZGFyQ29tcG9uZW50LFxuICAgIFRpbWVTZWxlY3RDb21wb25lbnQsXG4gICAgRGF5VGltZUNhbGVuZGFyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRHBEYXRlUGlja2VyTW9kdWxlIHtcbn1cbiJdfQ==