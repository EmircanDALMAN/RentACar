import { UtilsService } from '../common/services/utils/utils.service';
import { Injectable } from '@angular/core';
export class DatePickerDirectiveService {
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    convertToHTMLElement(attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    }
    getConfig(config = {}, baseElement, attachTo) {
        const _config = Object.assign({}, config);
        _config.hideInputContainer = true;
        let native;
        if (config.inputElementContainer) {
            native = this.utilsService.getNativeElement(config.inputElementContainer);
        }
        else {
            native = baseElement ? baseElement.nativeElement : null;
        }
        if (native) {
            _config.inputElementContainer = attachTo
                ? this.convertToHTMLElement(attachTo, native)
                : native;
        }
        return _config;
    }
}
DatePickerDirectiveService.decorators = [
    { type: Injectable }
];
DatePickerDirectiveService.ctorParameters = () => [
    { type: UtilsService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXItZGlyZWN0aXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2xpYi8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyL2RhdGUtcGlja2VyLWRpcmVjdGl2ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRSxPQUFPLEVBQWEsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3JELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFBbUIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDN0MsQ0FBQztJQUVELG9CQUFvQixDQUFDLFFBQTZCLEVBQUUsV0FBd0I7UUFDMUUsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDL0Q7YUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNuQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQXFDLEVBQUUsRUFDdkMsV0FBd0IsRUFDeEIsUUFBOEI7UUFDdEMsTUFBTSxPQUFPLHFCQUFtQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRWxDLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxNQUFNLENBQUMscUJBQXFCLEVBQUU7WUFDaEMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDM0U7YUFBTTtZQUNMLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN6RDtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxDQUFDLHFCQUFxQixHQUFHLFFBQVE7Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNaO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7O1lBcENGLFVBQVU7OztZQUpILFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF0ZVBpY2tlckRpcmVjdGl2ZUNvbmZpZ30gZnJvbSAnLi9kYXRlLXBpY2tlci1kaXJlY3RpdmUtY29uZmlnLm1vZGVsJztcbmltcG9ydCB7RWxlbWVudFJlZiwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyRGlyZWN0aXZlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSkge1xuICB9XG5cbiAgY29udmVydFRvSFRNTEVsZW1lbnQoYXR0YWNoVG86IEVsZW1lbnRSZWYgfCBzdHJpbmcsIGJhc2VFbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodHlwZW9mIGF0dGFjaFRvID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNsb3Nlc3RQYXJlbnQoYmFzZUVsZW1lbnQsIGF0dGFjaFRvKTtcbiAgICB9IGVsc2UgaWYgKGF0dGFjaFRvKSB7XG4gICAgICByZXR1cm4gYXR0YWNoVG8ubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0Q29uZmlnKGNvbmZpZzogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWcgPSB7fSxcbiAgICAgICAgICAgIGJhc2VFbGVtZW50PzogRWxlbWVudFJlZixcbiAgICAgICAgICAgIGF0dGFjaFRvPzogRWxlbWVudFJlZiB8IHN0cmluZyk6IElEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnIHtcbiAgICBjb25zdCBfY29uZmlnOiBJRGF0ZVBpY2tlckRpcmVjdGl2ZUNvbmZpZyA9IHsuLi5jb25maWd9O1xuICAgIF9jb25maWcuaGlkZUlucHV0Q29udGFpbmVyID0gdHJ1ZTtcblxuICAgIGxldCBuYXRpdmU7XG5cbiAgICBpZiAoY29uZmlnLmlucHV0RWxlbWVudENvbnRhaW5lcikge1xuICAgICAgbmF0aXZlID0gdGhpcy51dGlsc1NlcnZpY2UuZ2V0TmF0aXZlRWxlbWVudChjb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmF0aXZlID0gYmFzZUVsZW1lbnQgPyBiYXNlRWxlbWVudC5uYXRpdmVFbGVtZW50IDogbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobmF0aXZlKSB7XG4gICAgICBfY29uZmlnLmlucHV0RWxlbWVudENvbnRhaW5lciA9IGF0dGFjaFRvXG4gICAgICAgID8gdGhpcy5jb252ZXJ0VG9IVE1MRWxlbWVudChhdHRhY2hUbywgbmF0aXZlKVxuICAgICAgICA6IG5hdGl2ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxufVxuIl19