(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Xliff1TranslationParser = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var serialize_translation_message_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/serialize_translation_message");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    /**
     * A translation parser that can load XLIFF 1.2 files.
     *
     * https://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
     * https://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
     *
     * @see Xliff1TranslationSerializer
     * @publicApi used by CLI
     */
    var Xliff1TranslationParser = /** @class */ (function () {
        function Xliff1TranslationParser() {
        }
        /**
         * @deprecated
         */
        Xliff1TranslationParser.prototype.canParse = function (filePath, contents) {
            var result = this.analyze(filePath, contents);
            return result.canParse && result.hint;
        };
        Xliff1TranslationParser.prototype.analyze = function (filePath, contents) {
            return translation_utils_1.canParseXml(filePath, contents, 'xliff', { version: '1.2' });
        };
        Xliff1TranslationParser.prototype.parse = function (filePath, contents, hint) {
            if (hint) {
                return this.extractBundle(hint);
            }
            else {
                return this.extractBundleDeprecated(filePath, contents);
            }
        };
        Xliff1TranslationParser.prototype.extractBundle = function (_a) {
            var e_1, _b;
            var element = _a.element, errors = _a.errors;
            var diagnostics = new diagnostics_1.Diagnostics();
            errors.forEach(function (e) { return translation_utils_1.addParseError(diagnostics, e); });
            if (element.children.length === 0) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, 'Missing expected <file> element', compiler_1.ParseErrorLevel.WARNING);
                return { locale: undefined, translations: {}, diagnostics: diagnostics };
            }
            var files = element.children.filter(translation_utils_1.isNamedElement('file'));
            if (files.length === 0) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, 'No <file> elements found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            else if (files.length > 1) {
                translation_utils_1.addParseDiagnostic(diagnostics, files[1].sourceSpan, 'More than one <file> element found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            var bundle = { locale: undefined, translations: {}, diagnostics: diagnostics };
            var translationVisitor = new XliffTranslationVisitor();
            var localesFound = new Set();
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    var locale = translation_utils_1.getAttribute(file, 'target-language');
                    if (locale !== undefined) {
                        localesFound.add(locale);
                        bundle.locale = locale;
                    }
                    compiler_1.visitAll(translationVisitor, file.children, bundle);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_b = files_1.return)) _b.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (localesFound.size > 1) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, "More than one locale found in translation file: " + JSON.stringify(Array.from(localesFound)) + ". Using \"" + bundle.locale + "\"", compiler_1.ParseErrorLevel.WARNING);
            }
            return bundle;
        };
        Xliff1TranslationParser.prototype.extractBundleDeprecated = function (filePath, contents) {
            var hint = this.canParse(filePath, contents);
            if (!hint) {
                throw new Error("Unable to parse \"" + filePath + "\" as XLIFF 1.2 format.");
            }
            var bundle = this.extractBundle(hint);
            if (bundle.diagnostics.hasErrors) {
                var message = bundle.diagnostics.formatDiagnostics("Failed to parse \"" + filePath + "\" as XLIFF 1.2 format");
                throw new Error(message);
            }
            return bundle;
        };
        return Xliff1TranslationParser;
    }());
    exports.Xliff1TranslationParser = Xliff1TranslationParser;
    var XliffFileElementVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffFileElementVisitor, _super);
        function XliffFileElementVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XliffFileElementVisitor.prototype.visitElement = function (fileElement) {
            if (fileElement.name === 'file') {
                return { fileElement: fileElement, locale: translation_utils_1.getAttribute(fileElement, 'target-language') };
            }
        };
        return XliffFileElementVisitor;
    }(base_visitor_1.BaseVisitor));
    var XliffTranslationVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffTranslationVisitor, _super);
        function XliffTranslationVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XliffTranslationVisitor.prototype.visitElement = function (element, bundle) {
            if (element.name === 'trans-unit') {
                this.visitTransUnitElement(element, bundle);
            }
            else {
                compiler_1.visitAll(this, element.children, bundle);
            }
        };
        XliffTranslationVisitor.prototype.visitTransUnitElement = function (element, bundle) {
            // Error if no `id` attribute
            var id = translation_utils_1.getAttribute(element, 'id');
            if (id === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required \"id\" attribute on <trans-unit> element.", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            // Error if there is already a translation with the same id
            if (bundle.translations[id] !== undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Duplicated translations for message \"" + id + "\"", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            // Error if there is no `<target>` child element
            var targetMessage = element.children.find(translation_utils_1.isNamedElement('target'));
            if (targetMessage === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, 'Missing required <target> element', compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            var _a = serialize_translation_message_1.serializeTranslationMessage(targetMessage, {
                inlineElements: ['g', 'bx', 'ex', 'bpt', 'ept', 'ph', 'it', 'mrk'],
                placeholder: { elementName: 'x', nameAttribute: 'id' }
            }), translation = _a.translation, parseErrors = _a.parseErrors, serializeErrors = _a.serializeErrors;
            if (translation !== null) {
                bundle.translations[id] = translation;
            }
            translation_utils_1.addErrorsToBundle(bundle, parseErrors);
            translation_utils_1.addErrorsToBundle(bundle, serializeErrors);
        };
        return XliffTranslationVisitor;
    }(base_visitor_1.BaseVisitor));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQXFFO0lBRXJFLDJFQUFpRDtJQUNqRCx5R0FBNEM7SUFFNUMsK0pBQTRFO0lBRTVFLHVJQUE4SjtJQUU5Sjs7Ozs7Ozs7T0FRRztJQUNIO1FBQUE7UUFnRkEsQ0FBQztRQS9FQzs7V0FFRztRQUNILDBDQUFRLEdBQVIsVUFBUyxRQUFnQixFQUFFLFFBQWdCO1lBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUM7UUFFRCx5Q0FBTyxHQUFQLFVBQVEsUUFBZ0IsRUFBRSxRQUFnQjtZQUN4QyxPQUFPLCtCQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsdUNBQUssR0FBTCxVQUFNLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxJQUErQjtZQUV2RSxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0gsQ0FBQztRQUVPLCtD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LE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN2QyxxQ0FBaUIsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNILDhCQUFDO0lBQUQsQ0FBQyxBQTlDRCxDQUFzQywwQkFBVyxHQThDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RWxlbWVudCwgUGFyc2VFcnJvckxldmVsLCB2aXNpdEFsbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge0Jhc2VWaXNpdG9yfSBmcm9tICcuLi9iYXNlX3Zpc2l0b3InO1xuXG5pbXBvcnQge3NlcmlhbGl6ZVRyYW5zbGF0aW9uTWVzc2FnZX0gZnJvbSAnLi9zZXJpYWxpemVfdHJhbnNsYXRpb25fbWVzc2FnZSc7XG5pbXBvcnQge1BhcnNlQW5hbHlzaXMsIFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlLCBUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHthZGRFcnJvcnNUb0J1bmRsZSwgYWRkUGFyc2VEaWFnbm9zdGljLCBhZGRQYXJzZUVycm9yLCBjYW5QYXJzZVhtbCwgZ2V0QXR0cmlidXRlLCBpc05hbWVkRWxlbWVudCwgWG1sVHJhbnNsYXRpb25QYXJzZXJIaW50fSBmcm9tICcuL3RyYW5zbGF0aW9uX3V0aWxzJztcblxuLyoqXG4gKiBBIHRyYW5zbGF0aW9uIHBhcnNlciB0aGF0IGNhbiBsb2FkIFhMSUZGIDEuMiBmaWxlcy5cbiAqXG4gKiBodHRwczovL2RvY3Mub2FzaXMtb3Blbi5vcmcveGxpZmYvdjEuMi9vcy94bGlmZi1jb3JlLmh0bWxcbiAqIGh0dHBzOi8vZG9jcy5vYXNpcy1vcGVuLm9yZy94bGlmZi92MS4yL3hsaWZmLXByb2ZpbGUtaHRtbC94bGlmZi1wcm9maWxlLWh0bWwtMS4yLmh0bWxcbiAqXG4gKiBAc2VlIFhsaWZmMVRyYW5zbGF0aW9uU2VyaWFsaXplclxuICogQHB1YmxpY0FwaSB1c2VkIGJ5IENMSVxuICovXG5leHBvcnQgY2xhc3MgWGxpZmYxVHJhbnNsYXRpb25QYXJzZXIgaW1wbGVtZW50cyBUcmFuc2xhdGlvblBhcnNlcjxYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQ+IHtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBjYW5QYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogWG1sVHJhbnNsYXRpb25QYXJzZXJIaW50fGZhbHNlIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmFuYWx5emUoZmlsZVBhdGgsIGNvbnRlbnRzKTtcbiAgICByZXR1cm4gcmVzdWx0LmNhblBhcnNlICYmIHJlc3VsdC5oaW50O1xuICB9XG5cbiAgYW5hbHl6ZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogUGFyc2VBbmFseXNpczxYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQ+IHtcbiAgICByZXR1cm4gY2FuUGFyc2VYbWwoZmlsZVBhdGgsIGNvbnRlbnRzLCAneGxpZmYnLCB7dmVyc2lvbjogJzEuMid9KTtcbiAgfVxuXG4gIHBhcnNlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcsIGhpbnQ/OiBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQpOlxuICAgICAgUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUge1xuICAgIGlmIChoaW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5leHRyYWN0QnVuZGxlKGhpbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5leHRyYWN0QnVuZGxlRGVwcmVjYXRlZChmaWxlUGF0aCwgY29udGVudHMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEJ1bmRsZSh7ZWxlbWVudCwgZXJyb3JzfTogWG1sVHJhbnNsYXRpb25QYXJzZXJIaW50KTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUge1xuICAgIGNvbnN0IGRpYWdub3N0aWNzID0gbmV3IERpYWdub3N0aWNzKCk7XG4gICAgZXJyb3JzLmZvckVhY2goZSA9PiBhZGRQYXJzZUVycm9yKGRpYWdub3N0aWNzLCBlKSk7XG5cbiAgICBpZiAoZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICBkaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLCAnTWlzc2luZyBleHBlY3RlZCA8ZmlsZT4gZWxlbWVudCcsXG4gICAgICAgICAgUGFyc2VFcnJvckxldmVsLldBUk5JTkcpO1xuICAgICAgcmV0dXJuIHtsb2NhbGU6IHVuZGVmaW5lZCwgdHJhbnNsYXRpb25zOiB7fSwgZGlhZ25vc3RpY3N9O1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVzID0gZWxlbWVudC5jaGlsZHJlbi5maWx0ZXIoaXNOYW1lZEVsZW1lbnQoJ2ZpbGUnKSk7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sICdObyA8ZmlsZT4gZWxlbWVudHMgZm91bmQgaW4gPHhsaWZmPicsXG4gICAgICAgICAgUGFyc2VFcnJvckxldmVsLldBUk5JTkcpO1xuICAgIH0gZWxzZSBpZiAoZmlsZXMubGVuZ3RoID4gMSkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCBmaWxlc1sxXS5zb3VyY2VTcGFuLCAnTW9yZSB0aGFuIG9uZSA8ZmlsZT4gZWxlbWVudCBmb3VuZCBpbiA8eGxpZmY+JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSA9IHtsb2NhbGU6IHVuZGVmaW5lZCwgdHJhbnNsYXRpb25zOiB7fSwgZGlhZ25vc3RpY3N9O1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uVmlzaXRvciA9IG5ldyBYbGlmZlRyYW5zbGF0aW9uVmlzaXRvcigpO1xuICAgIGNvbnN0IGxvY2FsZXNGb3VuZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgbG9jYWxlID0gZ2V0QXR0cmlidXRlKGZpbGUsICd0YXJnZXQtbGFuZ3VhZ2UnKTtcbiAgICAgIGlmIChsb2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2NhbGVzRm91bmQuYWRkKGxvY2FsZSk7XG4gICAgICAgIGJ1bmRsZS5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICB9XG4gICAgICB2aXNpdEFsbCh0cmFuc2xhdGlvblZpc2l0b3IsIGZpbGUuY2hpbGRyZW4sIGJ1bmRsZSk7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsZXNGb3VuZC5zaXplID4gMSkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sXG4gICAgICAgICAgYE1vcmUgdGhhbiBvbmUgbG9jYWxlIGZvdW5kIGluIHRyYW5zbGF0aW9uIGZpbGU6ICR7XG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obG9jYWxlc0ZvdW5kKSl9LiBVc2luZyBcIiR7YnVuZGxlLmxvY2FsZX1cImAsXG4gICAgICAgICAgUGFyc2VFcnJvckxldmVsLldBUk5JTkcpO1xuICAgIH1cblxuICAgIHJldHVybiBidW5kbGU7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RCdW5kbGVEZXByZWNhdGVkKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBoaW50ID0gdGhpcy5jYW5QYXJzZShmaWxlUGF0aCwgY29udGVudHMpO1xuICAgIGlmICghaGludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhMSUZGIDEuMiBmb3JtYXQuYCk7XG4gICAgfVxuICAgIGNvbnN0IGJ1bmRsZSA9IHRoaXMuZXh0cmFjdEJ1bmRsZShoaW50KTtcbiAgICBpZiAoYnVuZGxlLmRpYWdub3N0aWNzLmhhc0Vycm9ycykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLmZvcm1hdERpYWdub3N0aWNzKGBGYWlsZWQgdG8gcGFyc2UgXCIke2ZpbGVQYXRofVwiIGFzIFhMSUZGIDEuMiBmb3JtYXRgKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1bmRsZTtcbiAgfVxufVxuXG5jbGFzcyBYbGlmZkZpbGVFbGVtZW50VmlzaXRvciBleHRlbmRzIEJhc2VWaXNpdG9yIHtcbiAgdmlzaXRFbGVtZW50KGZpbGVFbGVtZW50OiBFbGVtZW50KTogYW55IHtcbiAgICBpZiAoZmlsZUVsZW1lbnQubmFtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICByZXR1cm4ge2ZpbGVFbGVtZW50LCBsb2NhbGU6IGdldEF0dHJpYnV0ZShmaWxlRWxlbWVudCwgJ3RhcmdldC1sYW5ndWFnZScpfTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgWGxpZmZUcmFuc2xhdGlvblZpc2l0b3IgZXh0ZW5kcyBCYXNlVmlzaXRvciB7XG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50LCBidW5kbGU6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlKTogdm9pZCB7XG4gICAgaWYgKGVsZW1lbnQubmFtZSA9PT0gJ3RyYW5zLXVuaXQnKSB7XG4gICAgICB0aGlzLnZpc2l0VHJhbnNVbml0RWxlbWVudChlbGVtZW50LCBidW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuLCBidW5kbGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlzaXRUcmFuc1VuaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGJ1bmRsZTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUpOiB2b2lkIHtcbiAgICAvLyBFcnJvciBpZiBubyBgaWRgIGF0dHJpYnV0ZVxuICAgIGNvbnN0IGlkID0gZ2V0QXR0cmlidXRlKGVsZW1lbnQsICdpZCcpO1xuICAgIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sXG4gICAgICAgICAgYE1pc3NpbmcgcmVxdWlyZWQgXCJpZFwiIGF0dHJpYnV0ZSBvbiA8dHJhbnMtdW5pdD4gZWxlbWVudC5gLCBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEVycm9yIGlmIHRoZXJlIGlzIGFscmVhZHkgYSB0cmFuc2xhdGlvbiB3aXRoIHRoZSBzYW1lIGlkXG4gICAgaWYgKGJ1bmRsZS50cmFuc2xhdGlvbnNbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICBidW5kbGUuZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbiwgYER1cGxpY2F0ZWQgdHJhbnNsYXRpb25zIGZvciBtZXNzYWdlIFwiJHtpZH1cImAsXG4gICAgICAgICAgUGFyc2VFcnJvckxldmVsLkVSUk9SKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBFcnJvciBpZiB0aGVyZSBpcyBubyBgPHRhcmdldD5gIGNoaWxkIGVsZW1lbnRcbiAgICBjb25zdCB0YXJnZXRNZXNzYWdlID0gZWxlbWVudC5jaGlsZHJlbi5maW5kKGlzTmFtZWRFbGVtZW50KCd0YXJnZXQnKSk7XG4gICAgaWYgKHRhcmdldE1lc3NhZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLCAnTWlzc2luZyByZXF1aXJlZCA8dGFyZ2V0PiBlbGVtZW50JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHt0cmFuc2xhdGlvbiwgcGFyc2VFcnJvcnMsIHNlcmlhbGl6ZUVycm9yc30gPSBzZXJpYWxpemVUcmFuc2xhdGlvbk1lc3NhZ2UodGFyZ2V0TWVzc2FnZSwge1xuICAgICAgaW5saW5lRWxlbWVudHM6IFsnZycsICdieCcsICdleCcsICdicHQnLCAnZXB0JywgJ3BoJywgJ2l0JywgJ21yayddLFxuICAgICAgcGxhY2Vob2xkZXI6IHtlbGVtZW50TmFtZTogJ3gnLCBuYW1lQXR0cmlidXRlOiAnaWQnfVxuICAgIH0pO1xuICAgIGlmICh0cmFuc2xhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgYnVuZGxlLnRyYW5zbGF0aW9uc1tpZF0gPSB0cmFuc2xhdGlvbjtcbiAgICB9XG4gICAgYWRkRXJyb3JzVG9CdW5kbGUoYnVuZGxlLCBwYXJzZUVycm9ycyk7XG4gICAgYWRkRXJyb3JzVG9CdW5kbGUoYnVuZGxlLCBzZXJpYWxpemVFcnJvcnMpO1xuICB9XG59XG4iXX0=