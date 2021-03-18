import { EventEmitter, Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { DayTimeCalendarService } from '../day-time-calendar/day-time-calendar.service';
const moment = momentNs;
export class DatePickerService {
    constructor(utilsService, timeSelectService, daytimeCalendarService) {
        this.utilsService = utilsService;
        this.timeSelectService = timeSelectService;
        this.daytimeCalendarService = daytimeCalendarService;
        this.onPickerClosed = new EventEmitter();
        this.defaultConfig = {
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            closeOnEnter: true,
            format: 'DD-MM-YYYY',
            openOnFocus: true,
            openOnClick: true,
            onOpenDelay: 0,
            disableKeypress: false,
            showNearMonthDays: true,
            showWeekNumbers: false,
            enableMonthSelector: true,
            showGoToCurrent: true,
            locale: moment.locale(),
            hideOnOutsideClick: true
        };
    }
    // todo:: add unit tests
    getConfig(config, mode = 'daytime') {
        const _config = Object.assign(Object.assign(Object.assign({}, this.defaultConfig), { format: this.getDefaultFormatByMode(mode) }), this.utilsService.clearUndefined(config));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment.locale(_config.locale);
        return _config;
    }
    getDayConfigService(pickerConfig) {
        return {
            min: pickerConfig.min,
            max: pickerConfig.max,
            isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
            weekDayFormat: pickerConfig.weekDayFormat,
            weekDayFormatter: pickerConfig.weekDayFormatter,
            showNearMonthDays: pickerConfig.showNearMonthDays,
            showWeekNumbers: pickerConfig.showWeekNumbers,
            firstDayOfWeek: pickerConfig.firstDayOfWeek,
            format: pickerConfig.format,
            allowMultiSelect: pickerConfig.allowMultiSelect,
            monthFormat: pickerConfig.monthFormat,
            monthFormatter: pickerConfig.monthFormatter,
            enableMonthSelector: pickerConfig.enableMonthSelector,
            yearFormat: pickerConfig.yearFormat,
            yearFormatter: pickerConfig.yearFormatter,
            dayBtnFormat: pickerConfig.dayBtnFormat,
            dayBtnFormatter: pickerConfig.dayBtnFormatter,
            dayBtnCssClassCallback: pickerConfig.dayBtnCssClassCallback,
            monthBtnFormat: pickerConfig.monthBtnFormat,
            monthBtnFormatter: pickerConfig.monthBtnFormatter,
            monthBtnCssClassCallback: pickerConfig.monthBtnCssClassCallback,
            isMonthDisabledCallback: pickerConfig.isMonthDisabledCallback,
            multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
            locale: pickerConfig.locale,
            returnedValueType: pickerConfig.returnedValueType,
            showGoToCurrent: pickerConfig.showGoToCurrent,
            unSelectOnClick: pickerConfig.unSelectOnClick,
            numOfMonthRows: pickerConfig.numOfMonthRows
        };
    }
    getDayTimeConfigService(pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    }
    getTimeConfigService(pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    }
    pickerClosed() {
        this.onPickerClosed.emit();
    }
    // todo:: add unit tests
    isValidInputDateValue(value, config) {
        value = value ? value : '';
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return datesStrArr.every(date => this.utilsService.isDateValid(date, config.format));
    }
    // todo:: add unit tests
    convertInputValueToMomentArray(value, config) {
        value = value ? value : '';
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return this.utilsService.convertToMomentArray(datesStrArr, config);
    }
    getDefaultFormatByMode(mode) {
        switch (mode) {
            case 'day':
                return 'DD-MM-YYYY';
            case 'daytime':
                return 'DD-MM-YYYY HH:mm:ss';
            case 'time':
                return 'HH:mm:ss';
            case 'month':
                return 'MMM, YYYY';
        }
    }
}
DatePickerService.decorators = [
    { type: Injectable }
];
DatePickerService.ctorParameters = () => [
    { type: UtilsService },
    { type: TimeSelectService },
    { type: DayTimeCalendarService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvbGliLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUVuQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFFcEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFJdEYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBR3hCLE1BQU0sT0FBTyxpQkFBaUI7SUFtQjVCLFlBQW9CLFlBQTBCLEVBQzFCLGlCQUFvQyxFQUNwQyxzQkFBOEM7UUFGOUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBcEJ6RCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELGtCQUFhLEdBQThCO1lBQ2pELGFBQWEsRUFBRSxJQUFJO1lBQ25CLGtCQUFrQixFQUFFLEdBQUc7WUFDdkIsWUFBWSxFQUFFLElBQUk7WUFDbEIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLENBQUM7WUFDZCxlQUFlLEVBQUUsS0FBSztZQUN0QixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsZUFBZSxFQUFFLElBQUk7WUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxN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d0JBQXdCO0lBQ3hCLHFCQUFxQixDQUFDLEtBQWEsRUFBRSxNQUF5QjtRQUM1RCxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBYSxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhGLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLDhCQUE4QixDQUFDLEtBQWEsRUFBRSxNQUF5QjtRQUNyRSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBYSxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVPLHNCQUFzQixDQUFDLElBQWtCO1FBQy9DLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxLQUFLO2dCQUNSLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLEtBQUssU0FBUztnQkFDWixPQUFPLHFCQUFxQixDQUFDO1lBQy9CLEtBQUssTUFBTTtnQkFDVCxPQUFPLFVBQVUsQ0FBQztZQUNwQixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxXQUFXLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7WUFySEYsVUFBVTs7O1lBVEgsWUFBWTtZQUVaLGlCQUFpQjtZQUNqQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lEYXRlUGlja2VyQ29uZmlnLCBJRGF0ZVBpY2tlckNvbmZpZ0ludGVybmFsfSBmcm9tICcuL2RhdGUtcGlja2VyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF5Q2FsZW5kYXJDb25maWd9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7VGltZVNlbGVjdFNlcnZpY2V9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktdGltZS1jYWxlbmRhci9kYXktdGltZS1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7SVRpbWVTZWxlY3RDb25maWd9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0NhbGVuZGFyTW9kZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLW1vZGUnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgb25QaWNrZXJDbG9zZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZ0ludGVybmFsID0ge1xuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgY2xvc2VPblNlbGVjdERlbGF5OiAxMDAsXG4gICAgY2xvc2VPbkVudGVyOiB0cnVlLFxuICAgIGZvcm1hdDogJ0RELU1NLVlZWVknLFxuICAgIG9wZW5PbkZvY3VzOiB0cnVlLFxuICAgIG9wZW5PbkNsaWNrOiB0cnVlLFxuICAgIG9uT3BlbkRlbGF5OiAwLFxuICAgIGRpc2FibGVLZXlwcmVzczogZmFsc2UsXG4gICAgc2hvd05lYXJNb250aERheXM6IHRydWUsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBmYWxzZSxcbiAgICBlbmFibGVNb250aFNlbGVjdG9yOiB0cnVlLFxuICAgIHNob3dHb1RvQ3VycmVudDogdHJ1ZSxcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKSxcbiAgICBoaWRlT25PdXRzaWRlQ2xpY2s6IHRydWVcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRpbWVTZWxlY3RTZXJ2aWNlOiBUaW1lU2VsZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkYXl0aW1lQ2FsZW5kYXJTZXJ2aWNlOiBEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlKSB7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgZ2V0Q29uZmlnKGNvbmZpZzogSURhdGVQaWNrZXJDb25maWcsIG1vZGU6IENhbGVuZGFyTW9kZSA9ICdkYXl0aW1lJyk6IElEYXRlUGlja2VyQ29uZmlnSW50ZXJuYWwge1xuICAgIGNvbnN0IF9jb25maWcgPSA8SURhdGVQaWNrZXJDb25maWdJbnRlcm5hbD57XG4gICAgICAuLi50aGlzLmRlZmF1bHRDb25maWcsXG4gICAgICBmb3JtYXQ6IHRoaXMuZ2V0RGVmYXVsdEZvcm1hdEJ5TW9kZShtb2RlKSxcbiAgICAgIC4uLnRoaXMudXRpbHNTZXJ2aWNlLmNsZWFyVW5kZWZpbmVkKGNvbmZpZylcbiAgICB9O1xuXG4gICAgdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFByb3BzVG9Nb21lbnQoX2NvbmZpZywgX2NvbmZpZy5mb3JtYXQsIFsnbWluJywgJ21heCddKTtcblxuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmFsbG93TXVsdGlTZWxlY3QgJiYgY29uZmlnLmNsb3NlT25TZWxlY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgX2NvbmZpZy5jbG9zZU9uU2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbW9tZW50LmxvY2FsZShfY29uZmlnLmxvY2FsZSk7XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxuXG4gIGdldERheUNvbmZpZ1NlcnZpY2UocGlja2VyQ29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IElEYXlDYWxlbmRhckNvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbjogcGlja2VyQ29uZmlnLm1pbixcbiAgICAgIG1heDogcGlja2VyQ29uZmlnLm1heCxcbiAgICAgIGlzRGF5RGlzYWJsZWRDYWxsYmFjazogcGlja2VyQ29uZmlnLmlzRGF5RGlzYWJsZWRDYWxsYmFjayxcbiAgICAgIHdlZWtEYXlGb3JtYXQ6IHBpY2tlckNvbmZpZy53ZWVrRGF5Rm9ybWF0LFxuICAgICAgd2Vla0RheUZvcm1hdHRlcjogcGlja2VyQ29uZmlnLndlZWtEYXlGb3JtYXR0ZXIsXG4gICAgICBzaG93TmVhck1vbnRoRGF5czogcGlja2VyQ29uZmlnLnNob3dOZWFyTW9udGhEYXlzLFxuICAgICAgc2hvd1dlZWtOdW1iZXJzOiBwaWNrZXJDb25maWcuc2hvd1dlZWtOdW1iZXJzLFxuICAgICAgZmlyc3REYXlPZldlZWs6IHBpY2tlckNvbmZpZy5maXJzdERheU9mV2VlayxcbiAgICAgIGZvcm1hdDogcGlja2VyQ29uZmlnLmZvcm1hdCxcbiAgICAgIGFsbG93TXVsdGlTZWxlY3Q6IHBpY2tlckNvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgbW9udGhGb3JtYXQ6IHBpY2tlckNvbmZpZy5tb250aEZvcm1hdCxcbiAgICAgIG1vbnRoRm9ybWF0dGVyOiBwaWNrZXJDb25maWcubW9udGhGb3JtYXR0ZXIsXG4gICAgICBlbmFibGVNb250aFNlbGVjdG9yOiBwaWNrZXJDb25maWcuZW5hYmxlTW9udGhTZWxlY3RvcixcbiAgICAgIHllYXJGb3JtYXQ6IHBpY2tlckNvbmZpZy55ZWFyRm9ybWF0LFxuICAgICAgeWVhckZvcm1hdHRlcjogcGlja2VyQ29uZmlnLnllYXJGb3JtYXR0ZXIsXG4gICAgICBkYXlCdG5Gb3JtYXQ6IHBpY2tlckNvbmZpZy5kYXlCdG5Gb3JtYXQsXG4gICAgICBkYXlCdG5Gb3JtYXR0ZXI6IHBpY2tlckNvbmZpZy5kYXlCdG5Gb3JtYXR0ZXIsXG4gICAgICBkYXlCdG5Dc3NDbGFzc0NhbGxiYWNrOiBwaWNrZXJDb25maWcuZGF5QnRuQ3NzQ2xhc3NDYWxsYmFjayxcbiAgICAgIG1vbnRoQnRuRm9ybWF0OiBwaWNrZXJDb25maWcubW9udGhCdG5Gb3JtYXQsXG4gICAgICBtb250aEJ0bkZvcm1hdHRlcjogcGlja2VyQ29uZmlnLm1vbnRoQnRuRm9ybWF0dGVyLFxuICAgICAgbW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrOiBwaWNrZXJDb25maWcubW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrLFxuICAgICAgaXNNb250aERpc2FibGVkQ2FsbGJhY2s6IHBpY2tlckNvbmZpZy5pc01vbnRoRGlzYWJsZWRDYWxsYmFjayxcbiAgICAgIG11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5OiBwaWNrZXJDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnksXG4gICAgICBzaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb246IHBpY2tlckNvbmZpZy5zaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb24sXG4gICAgICBsb2NhbGU6IHBpY2tlckNvbmZpZy5sb2NhbGUsXG4gICAgICByZXR1cm5lZFZhbHVlVHlwZTogcGlja2VyQ29uZmlnLnJldHVybmVkVmFsdWVUeXBlLFxuICAgICAgc2hvd0dvVG9DdXJyZW50OiBwaWNrZXJDb25maWcuc2hvd0dvVG9DdXJyZW50LFxuICAgICAgdW5TZWxlY3RPbkNsaWNrOiBwaWNrZXJDb25maWcudW5TZWxlY3RPbkNsaWNrLFxuICAgICAgbnVtT2ZNb250aFJvd3M6IHBpY2tlckNvbmZpZy5udW1PZk1vbnRoUm93c1xuICAgIH07XG4gIH1cblxuICBnZXREYXlUaW1lQ29uZmlnU2VydmljZShwaWNrZXJDb25maWc6IElEYXRlUGlja2VyQ29uZmlnKTogSVRpbWVTZWxlY3RDb25maWcge1xuICAgIHJldHVybiB0aGlzLmRheXRpbWVDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKHBpY2tlckNvbmZpZyk7XG4gIH1cblxuICBnZXRUaW1lQ29uZmlnU2VydmljZShwaWNrZXJDb25maWc6IElEYXRlUGlja2VyQ29uZmlnKTogSVRpbWVTZWxlY3RDb25maWcge1xuICAgIHJldHVybiB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldENvbmZpZyhwaWNrZXJDb25maWcpO1xuICB9XG5cbiAgcGlja2VyQ2xvc2VkKCkge1xuICAgIHRoaXMub25QaWNrZXJDbG9zZWQuZW1pdCgpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RzXG4gIGlzVmFsaWRJbnB1dERhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nLCBjb25maWc6IElEYXRlUGlja2VyQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgdmFsdWUgPSB2YWx1ZSA/IHZhbHVlIDogJyc7XG4gICAgY29uc3QgZGF0ZXNTdHJBcnI6IHN0cmluZ1tdID0gdGhpcy51dGlsc1NlcnZpY2UuZGF0ZXNTdHJpbmdUb1N0cmluZ0FycmF5KHZhbHVlKTtcblxuICAgIHJldHVybiBkYXRlc1N0ckFyci5ldmVyeShkYXRlID0+IHRoaXMudXRpbHNTZXJ2aWNlLmlzRGF0ZVZhbGlkKGRhdGUsIGNvbmZpZy5mb3JtYXQpKTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0c1xuICBjb252ZXJ0SW5wdXRWYWx1ZVRvTW9tZW50QXJyYXkodmFsdWU6IHN0cmluZywgY29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IE1vbWVudFtdIHtcbiAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUgOiAnJztcbiAgICBjb25zdCBkYXRlc1N0ckFycjogc3RyaW5nW10gPSB0aGlzLnV0aWxzU2VydmljZS5kYXRlc1N0cmluZ1RvU3RyaW5nQXJyYXkodmFsdWUpO1xuXG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRUb01vbWVudEFycmF5KGRhdGVzU3RyQXJyLCBjb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0Rm9ybWF0QnlNb2RlKG1vZGU6IENhbGVuZGFyTW9kZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICByZXR1cm4gJ0RELU1NLVlZWVknO1xuICAgICAgY2FzZSAnZGF5dGltZSc6XG4gICAgICAgIHJldHVybiAnREQtTU0tWVlZWSBISDptbTpzcyc7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuICdISDptbTpzcyc7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiAnTU1NLCBZWVlZJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==