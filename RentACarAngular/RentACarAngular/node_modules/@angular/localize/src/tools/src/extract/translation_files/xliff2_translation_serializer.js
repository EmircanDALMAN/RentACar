(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/xliff2_translation_serializer", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/localize/src/tools/src/extract/translation_files/format_options", "@angular/localize/src/tools/src/extract/translation_files/icu_parsing", "@angular/localize/src/tools/src/extract/translation_files/utils", "@angular/localize/src/tools/src/extract/translation_files/xml_file"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Xliff2TranslationSerializer = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var format_options_1 = require("@angular/localize/src/tools/src/extract/translation_files/format_options");
    var icu_parsing_1 = require("@angular/localize/src/tools/src/extract/translation_files/icu_parsing");
    var utils_1 = require("@angular/localize/src/tools/src/extract/translation_files/utils");
    var xml_file_1 = require("@angular/localize/src/tools/src/extract/translation_files/xml_file");
    /** This is the maximum number of characters that can appear in a legacy XLIFF 2.0 message id. */
    var MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH = 20;
    /**
     * A translation serializer that can write translations in XLIFF 2 format.
     *
     * https://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
     *
     * @see Xliff2TranslationParser
     * @publicApi used by CLI
     */
    var Xliff2TranslationSerializer = /** @class */ (function () {
        function Xliff2TranslationSerializer(sourceLocale, basePath, useLegacyIds, formatOptions, fs) {
            if (formatOptions === void 0) { formatOptions = {}; }
            if (fs === void 0) { fs = file_system_1.getFileSystem(); }
            this.sourceLocale = sourceLocale;
            this.basePath = basePath;
            this.useLegacyIds = useLegacyIds;
            this.formatOptions = formatOptions;
            this.fs = fs;
            this.currentPlaceholderId = 0;
            format_options_1.validateOptions('Xliff1TranslationSerializer', [['xml:space', ['preserve']]], formatOptions);
        }
        Xliff2TranslationSerializer.prototype.serialize = function (messages) {
            var e_1, _a, e_2, _b;
            var _this = this;
            var messageGroups = utils_1.consolidateMessages(messages, function (message) { return _this.getMessageId(message); });
            var xml = new xml_file_1.XmlFile();
            xml.startTag('xliff', {
                'version': '2.0',
                'xmlns': 'urn:oasis:names:tc:xliff:document:2.0',
                'srcLang': this.sourceLocale
            });
            // NOTE: the `original` property is set to the legacy `ng.template` value for backward
            // compatibility.
            // We could compute the file from the `message.location` property, but there could
            // be multiple values for this in the collection of `messages`. In that case we would probably
            // need to change the serializer to output a new `<file>` element for each collection of
            // messages that come from a particular original file, and the translation file parsers may
            // not
            xml.startTag('file', tslib_1.__assign({ 'id': 'ngi18n', 'original': 'ng.template' }, this.formatOptions));
            try {
                for (var messageGroups_1 = tslib_1.__values(messageGroups), messageGroups_1_1 = messageGroups_1.next(); !messageGroups_1_1.done; messageGroups_1_1 = messageGroups_1.next()) {
                    var duplicateMessages = messageGroups_1_1.value;
                    var message = duplicateMessages[0];
                    var id = this.getMessageId(message);
                    xml.startTag('unit', { id: id });
                    var messagesWithLocations = duplicateMessages.filter(utils_1.hasLocation);
                    if (message.meaning || message.description || messagesWithLocations.length) {
                        xml.startTag('notes');
                        try {
                            // Write all the locations
                            for (var messagesWithLocations_1 = (e_2 = void 0, tslib_1.__values(messagesWithLocations)), messagesWithLocations_1_1 = messagesWithLocations_1.next(); !messagesWithLocations_1_1.done; messagesWithLocations_1_1 = messagesWithLocations_1.next()) {
                                var _c = messagesWithLocations_1_1.value.location, file = _c.file, start = _c.start, end = _c.end;
                                var endLineString = end !== undefined && end.line !== start.line ? "," + (end.line + 1) : '';
                                this.serializeNote(xml, 'location', this.fs.relative(this.basePath, file) + ":" + (start.line + 1) + endLineString);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (messagesWithLocations_1_1 && !messagesWithLocations_1_1.done && (_b = messagesWithLocations_1.return)) _b.call(messagesWithLocations_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (message.description) {
                            this.serializeNote(xml, 'description', message.description);
                        }
                        if (message.meaning) {
                            this.serializeNote(xml, 'meaning', message.meaning);
                        }
                        xml.endTag('notes');
                    }
                    xml.startTag('segment');
                    xml.startTag('source', {}, { preserveWhitespace: true });
                    this.serializeMessage(xml, message);
                    xml.endTag('source', { preserveWhitespace: false });
                    xml.endTag('segment');
                    xml.endTag('unit');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (messageGroups_1_1 && !messageGroups_1_1.done && (_a = messageGroups_1.return)) _a.call(messageGroups_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            xml.endTag('file');
            xml.endTag('xliff');
            return xml.toString();
        };
        Xliff2TranslationSerializer.prototype.serializeMessage = function (xml, message) {
            this.currentPlaceholderId = 0;
            var length = message.messageParts.length - 1;
            for (var i = 0; i < length; i++) {
                this.serializeTextPart(xml, message.messageParts[i]);
                this.serializePlaceholder(xml, message.placeholderNames[i], message.substitutionLocations);
            }
            this.serializeTextPart(xml, message.messageParts[length]);
        };
        Xliff2TranslationSerializer.prototype.serializeTextPart = function (xml, text) {
            var pieces = icu_parsing_1.extractIcuPlaceholders(text);
            var length = pieces.length - 1;
            for (var i = 0; i < length; i += 2) {
                xml.text(pieces[i]);
                this.serializePlaceholder(xml, pieces[i + 1], undefined);
            }
            xml.text(pieces[length]);
        };
        Xliff2TranslationSerializer.prototype.serializePlaceholder = function (xml, placeholderName, substitutionLocations) {
            var _a, _b;
            var text = (_a = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[placeholderName]) === null || _a === void 0 ? void 0 : _a.text;
            if (placeholderName.startsWith('START_')) {
                var closingPlaceholderName = placeholderName.replace(/^START/, 'CLOSE');
                var closingText = (_b = substitutionLocations === null || substitutionLocations === void 0 ? void 0 : substitutionLocations[closingPlaceholderName]) === null || _b === void 0 ? void 0 : _b.text;
                var attrs = {
                    id: "" + this.currentPlaceholderId++,
                    equivStart: placeholderName,
                    equivEnd: closingPlaceholderName,
                };
                var type = getTypeForPlaceholder(placeholderName);
                if (type !== null) {
                    attrs.type = type;
                }
                if (text !== undefined) {
                    attrs.dispStart = text;
                }
                if (closingText !== undefined) {
                    attrs.dispEnd = closingText;
                }
                xml.startTag('pc', attrs);
            }
            else if (placeholderName.startsWith('CLOSE_')) {
                xml.endTag('pc');
            }
            else {
                var attrs = {
                    id: "" + this.currentPlaceholderId++,
                    equiv: placeholderName,
                };
                var type = getTypeForPlaceholder(placeholderName);
                if (type !== null) {
                    attrs.type = type;
                }
                if (text !== undefined) {
                    attrs.disp = text;
                }
                xml.startTag('ph', attrs, { selfClosing: true });
            }
        };
        Xliff2TranslationSerializer.prototype.serializeNote = function (xml, name, value) {
            xml.startTag('note', { category: name }, { preserveWhitespace: true });
            xml.text(value);
            xml.endTag('note', { preserveWhitespace: false });
        };
        /**
         * Get the id for the given `message`.
         *
         * If there was a custom id provided, use that.
         *
         * If we have requested legacy message ids, then try to return the appropriate id
         * from the list of legacy ids that were extracted.
         *
         * Otherwise return the canonical message id.
         *
         * An Xliff 2.0 legacy message id is a 64 bit number encoded as a decimal string, which will have
         * at most 20 digits, since 2^65-1 = 36,893,488,147,419,103,231. This digest is based on:
         * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/GoogleJsMessageIdGenerator.java
         */
        Xliff2TranslationSerializer.prototype.getMessageId = function (message) {
            return message.customId ||
                this.useLegacyIds && message.legacyIds !== undefined &&
                    message.legacyIds.find(function (id) { return id.length <= MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH && !/[^0-9]/.test(id); }) ||
                message.id;
        };
        return Xliff2TranslationSerializer;
    }());
    exports.Xliff2TranslationSerializer = Xliff2TranslationSerializer;
    /**
     * Compute the value of the `type` attribute from the `placeholder` name.
     *
     * If the tag is not known but starts with `TAG_`, `START_TAG_` or `CLOSE_TAG_` then the type is
     * `other`. Certain formatting tags (e.g. bold, italic, etc) have type `fmt`. Line-breaks, images
     * and links are special cases.
     */
    function getTypeForPlaceholder(placeholder) {
        var tag = placeholder.replace(/^(START_|CLOSE_)/, '');
        switch (tag) {
            case 'BOLD_TEXT':
            case 'EMPHASISED_TEXT':
            case 'ITALIC_TEXT':
            case 'LINE_BREAK':
            case 'STRIKETHROUGH_TEXT':
            case 'UNDERLINED_TEXT':
                return 'fmt';
            case 'TAG_IMG':
                return 'image';
            case 'LINK':
                return 'link';
            default:
                return /^(START_|CLOSE_)/.test(placeholder) ? 'other' : null;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMveGxpZmYyX3RyYW5zbGF0aW9uX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUE0RztJQUc1RywyR0FBZ0U7SUFDaEUscUdBQXFEO0lBRXJELHlGQUF5RDtJQUN6RCwrRkFBbUM7SUFFbkMsaUdBQWlHO0lBQ2pHLElBQU0saUNBQWlDLEdBQUcsRUFBRSxDQUFDO0lBRTdDOzs7Ozs7O09BT0c7SUFDSDtRQUVFLHFDQUNZLFlBQW9CLEVBQVUsUUFBd0IsRUFBVSxZQUFxQixFQUNyRixhQUFpQyxFQUFVLEVBQXNDO1lBQWpGLDhCQUFBLEVBQUEsa0JBQWlDO1lBQVUsbUJBQUEsRUFBQSxLQUF1QiwyQkFBYSxFQUFFO1lBRGpGLGlCQUFZLEdBQVosWUFBWSxDQUFRO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7WUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBUztZQUNyRixrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFvQztZQUhyRix5QkFBb0IsR0FBRyxDQUFDLENBQUM7WUFJL0IsZ0NBQWUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9GLENBQUM7UUFFRCwrQ0FBUyxHQUFULFVBQVUsUUFBMEI7O1lBQXBDLGlCQW9EQztZQW5EQyxJQUFNLGFBQWEsR0FBRywyQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9B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QUNsRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNLLGtEQUFZLEdBQXBCLFVBQXFCLE9BQXVCO1lBQzFDLE9BQU8sT0FBTyxDQUFDLFFBQVE7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTO29CQUNwRCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDbEIsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsTUFBTSxJQUFJLGlDQUFpQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBcEUsQ0FBb0UsQ0FBQztnQkFDL0UsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQ0gsa0NBQUM7SUFBRCxDQUFDLEFBdkpELElBdUpDO0lBdkpZLGtFQUEyQjtJQXlKeEM7Ozs7OztPQU1HO0lBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxXQUFtQjtRQUNoRCxJQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELFFBQVEsR0FBRyxFQUFFO1lBQ1gsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxpQkFBaUIsQ0FBQztZQUN2QixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLG9CQUFvQixDQUFDO1lBQzFCLEtBQUssaUJBQWlCO2dCQUNwQixPQUFPLEtBQUssQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixPQUFPLE9BQU8sQ0FBQztZQUNqQixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxNQUFNLENBQUM7WUFDaEI7Z0JBQ0UsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgZ2V0RmlsZVN5c3RlbSwgUGF0aE1hbmlwdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge8m1UGFyc2VkTWVzc2FnZSwgybVTb3VyY2VMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuXG5pbXBvcnQge0Zvcm1hdE9wdGlvbnMsIHZhbGlkYXRlT3B0aW9uc30gZnJvbSAnLi9mb3JtYXRfb3B0aW9ucyc7XG5pbXBvcnQge2V4dHJhY3RJY3VQbGFjZWhvbGRlcnN9IGZyb20gJy4vaWN1X3BhcnNpbmcnO1xuaW1wb3J0IHtUcmFuc2xhdGlvblNlcmlhbGl6ZXJ9IGZyb20gJy4vdHJhbnNsYXRpb25fc2VyaWFsaXplcic7XG5pbXBvcnQge2NvbnNvbGlkYXRlTWVzc2FnZXMsIGhhc0xvY2F0aW9ufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7WG1sRmlsZX0gZnJvbSAnLi94bWxfZmlsZSc7XG5cbi8qKiBUaGlzIGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgY2FuIGFwcGVhciBpbiBhIGxlZ2FjeSBYTElGRiAyLjAgbWVzc2FnZSBpZC4gKi9cbmNvbnN0IE1BWF9MRUdBQ1lfWExJRkZfMl9NRVNTQUdFX0xFTkdUSCA9IDIwO1xuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gc2VyaWFsaXplciB0aGF0IGNhbiB3cml0ZSB0cmFuc2xhdGlvbnMgaW4gWExJRkYgMiBmb3JtYXQuXG4gKlxuICogaHR0cHM6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3hsaWZmLWNvcmUvdjIuMC9vcy94bGlmZi1jb3JlLXYyLjAtb3MuaHRtbFxuICpcbiAqIEBzZWUgWGxpZmYyVHJhbnNsYXRpb25QYXJzZXJcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMlRyYW5zbGF0aW9uU2VyaWFsaXplciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uU2VyaWFsaXplciB7XG4gIHByaXZhdGUgY3VycmVudFBsYWNlaG9sZGVySWQgPSAwO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc291cmNlTG9jYWxlOiBzdHJpbmcsIHByaXZhdGUgYmFzZVBhdGg6IEFic29sdXRlRnNQYXRoLCBwcml2YXRlIHVzZUxlZ2FjeUlkczogYm9vbGVhbixcbiAgICAgIHByaXZhdGUgZm9ybWF0T3B0aW9uczogRm9ybWF0T3B0aW9ucyA9IHt9LCBwcml2YXRlIGZzOiBQYXRoTWFuaXB1bGF0aW9uID0gZ2V0RmlsZVN5c3RlbSgpKSB7XG4gICAgdmFsaWRhdGVPcHRpb25zKCdYbGlmZjFUcmFuc2xhdGlvblNlcmlhbGl6ZXInLCBbWyd4bWw6c3BhY2UnLCBbJ3ByZXNlcnZlJ11dXSwgZm9ybWF0T3B0aW9ucyk7XG4gIH1cblxuICBzZXJpYWxpemUobWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlR3JvdXBzID0gY29uc29saWRhdGVNZXNzYWdlcyhtZXNzYWdlcywgbWVzc2FnZSA9PiB0aGlzLmdldE1lc3NhZ2VJZChtZXNzYWdlKSk7XG4gICAgY29uc3QgeG1sID0gbmV3IFhtbEZpbGUoKTtcbiAgICB4bWwuc3RhcnRUYWcoJ3hsaWZmJywge1xuICAgICAgJ3ZlcnNpb24nOiAnMi4wJyxcbiAgICAgICd4bWxucyc6ICd1cm46b2FzaXM6bmFtZXM6dGM6eGxpZmY6ZG9jdW1lbnQ6Mi4wJyxcbiAgICAgICdzcmNMYW5nJzogdGhpcy5zb3VyY2VMb2NhbGVcbiAgICB9KTtcbiAgICAvLyBOT1RFOiB0aGUgYG9yaWdpbmFsYCBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIGxlZ2FjeSBgbmcudGVtcGxhdGVgIHZhbHVlIGZvciBiYWNrd2FyZFxuICAgIC8vIGNvbXBhdGliaWxpdHkuXG4gICAgLy8gV2UgY291bGQgY29tcHV0ZSB0aGUgZmlsZSBmcm9tIHRoZSBgbWVzc2FnZS5sb2NhdGlvbmAgcHJvcGVydHksIGJ1dCB0aGVyZSBjb3VsZFxuICAgIC8vIGJlIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhpcyBpbiB0aGUgY29sbGVjdGlvbiBvZiBgbWVzc2FnZXNgLiBJbiB0aGF0IGNhc2Ugd2Ugd291bGQgcHJvYmFibHlcbiAgICAvLyBuZWVkIHRvIGNoYW5nZSB0aGUgc2VyaWFsaXplciB0byBvdXRwdXQgYSBuZXcgYDxmaWxlPmAgZWxlbWVudCBmb3IgZWFjaCBjb2xsZWN0aW9uIG9mXG4gICAgLy8gbWVzc2FnZXMgdGhhdCBjb21lIGZyb20gYSBwYXJ0aWN1bGFyIG9yaWdpbmFsIGZpbGUsIGFuZCB0aGUgdHJhbnNsYXRpb24gZmlsZSBwYXJzZXJzIG1heVxuICAgIC8vIG5vdFxuICAgIHhtbC5zdGFydFRhZygnZmlsZScsIHsnaWQnOiAnbmdpMThuJywgJ29yaWdpbmFsJzogJ25nLnRlbXBsYXRlJywgLi4udGhpcy5mb3JtYXRPcHRpb25zfSk7XG4gICAgZm9yIChjb25zdCBkdXBsaWNhdGVNZXNzYWdlcyBvZiBtZXNzYWdlR3JvdXBzKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZHVwbGljYXRlTWVzc2FnZXNbMF07XG4gICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0TWVzc2FnZUlkKG1lc3NhZ2UpO1xuXG4gICAgICB4bWwuc3RhcnRUYWcoJ3VuaXQnLCB7aWR9KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VzV2l0aExvY2F0aW9ucyA9IGR1cGxpY2F0ZU1lc3NhZ2VzLmZpbHRlcihoYXNMb2NhdGlvbik7XG4gICAgICBpZiAobWVzc2FnZS5tZWFuaW5nIHx8IG1lc3NhZ2UuZGVzY3JpcHRpb24gfHwgbWVzc2FnZXNXaXRoTG9jYXRpb25zLmxlbmd0aCkge1xuICAgICAgICB4bWwuc3RhcnRUYWcoJ25vdGVzJyk7XG5cbiAgICAgICAgLy8gV3JpdGUgYWxsIHRoZSBsb2NhdGlvbnNcbiAgICAgICAgZm9yIChjb25zdCB7bG9jYXRpb246IHtmaWxlLCBzdGFydCwgZW5kfX0gb2YgbWVzc2FnZXNXaXRoTG9jYXRpb25zKSB7XG4gICAgICAgICAgY29uc3QgZW5kTGluZVN0cmluZyA9XG4gICAgICAgICAgICAgIGVuZCAhPT0gdW5kZWZpbmVkICYmIGVuZC5saW5lICE9PSBzdGFydC5saW5lID8gYCwke2VuZC5saW5lICsgMX1gIDogJyc7XG4gICAgICAgICAgdGhpcy5zZXJpYWxpemVOb3RlKFxuICAgICAgICAgICAgICB4bWwsICdsb2NhdGlvbicsXG4gICAgICAgICAgICAgIGAke3RoaXMuZnMucmVsYXRpdmUodGhpcy5iYXNlUGF0aCwgZmlsZSl9OiR7c3RhcnQubGluZSArIDF9JHtlbmRMaW5lU3RyaW5nfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vdGUoeG1sLCAnZGVzY3JpcHRpb24nLCBtZXNzYWdlLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5tZWFuaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZXJpYWxpemVOb3RlKHhtbCwgJ21lYW5pbmcnLCBtZXNzYWdlLm1lYW5pbmcpO1xuICAgICAgICB9XG4gICAgICAgIHhtbC5lbmRUYWcoJ25vdGVzJyk7XG4gICAgICB9XG4gICAgICB4bWwuc3RhcnRUYWcoJ3NlZ21lbnQnKTtcbiAgICAgIHhtbC5zdGFydFRhZygnc291cmNlJywge30sIHtwcmVzZXJ2ZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgICAgIHRoaXMuc2VyaWFsaXplTWVzc2FnZSh4bWwsIG1lc3NhZ2UpO1xuICAgICAgeG1sLmVuZFRhZygnc291cmNlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgICAgIHhtbC5lbmRUYWcoJ3NlZ21lbnQnKTtcbiAgICAgIHhtbC5lbmRUYWcoJ3VuaXQnKTtcbiAgICB9XG4gICAgeG1sLmVuZFRhZygnZmlsZScpO1xuICAgIHhtbC5lbmRUYWcoJ3hsaWZmJyk7XG4gICAgcmV0dXJuIHhtbC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVNZXNzYWdlKHhtbDogWG1sRmlsZSwgbWVzc2FnZTogybVQYXJzZWRNZXNzYWdlKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UGxhY2Vob2xkZXJJZCA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gbWVzc2FnZS5tZXNzYWdlUGFydHMubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnNlcmlhbGl6ZVRleHRQYXJ0KHhtbCwgbWVzc2FnZS5tZXNzYWdlUGFydHNbaV0pO1xuICAgICAgdGhpcy5zZXJpYWxpemVQbGFjZWhvbGRlcih4bWwsIG1lc3NhZ2UucGxhY2Vob2xkZXJOYW1lc1tpXSwgbWVzc2FnZS5zdWJzdGl0dXRpb25Mb2NhdGlvbnMpO1xuICAgIH1cbiAgICB0aGlzLnNlcmlhbGl6ZVRleHRQYXJ0KHhtbCwgbWVzc2FnZS5tZXNzYWdlUGFydHNbbGVuZ3RoXSk7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZVRleHRQYXJ0KHhtbDogWG1sRmlsZSwgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGllY2VzID0gZXh0cmFjdEljdVBsYWNlaG9sZGVycyh0ZXh0KTtcbiAgICBjb25zdCBsZW5ndGggPSBwaWVjZXMubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB4bWwudGV4dChwaWVjZXNbaV0pO1xuICAgICAgdGhpcy5zZXJpYWxpemVQbGFjZWhvbGRlcih4bWwsIHBpZWNlc1tpICsgMV0sIHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHhtbC50ZXh0KHBpZWNlc1tsZW5ndGhdKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplUGxhY2Vob2xkZXIoXG4gICAgICB4bWw6IFhtbEZpbGUsIHBsYWNlaG9sZGVyTmFtZTogc3RyaW5nLFxuICAgICAgc3Vic3RpdHV0aW9uTG9jYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCDJtVNvdXJjZUxvY2F0aW9ufHVuZGVmaW5lZD58dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgY29uc3QgdGV4dCA9IHN1YnN0aXR1dGlvbkxvY2F0aW9ucz8uW3BsYWNlaG9sZGVyTmFtZV0/LnRleHQ7XG5cbiAgICBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ1NUQVJUXycpKSB7XG4gICAgICBjb25zdCBjbG9zaW5nUGxhY2Vob2xkZXJOYW1lID0gcGxhY2Vob2xkZXJOYW1lLnJlcGxhY2UoL15TVEFSVC8sICdDTE9TRScpO1xuICAgICAgY29uc3QgY2xvc2luZ1RleHQgPSBzdWJzdGl0dXRpb25Mb2NhdGlvbnM/LltjbG9zaW5nUGxhY2Vob2xkZXJOYW1lXT8udGV4dDtcbiAgICAgIGNvbnN0IGF0dHJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBpZDogYCR7dGhpcy5jdXJyZW50UGxhY2Vob2xkZXJJZCsrfWAsXG4gICAgICAgIGVxdWl2U3RhcnQ6IHBsYWNlaG9sZGVyTmFtZSxcbiAgICAgICAgZXF1aXZFbmQ6IGNsb3NpbmdQbGFjZWhvbGRlck5hbWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgdHlwZSA9IGdldFR5cGVGb3JQbGFjZWhvbGRlcihwbGFjZWhvbGRlck5hbWUpO1xuICAgICAgaWYgKHR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgYXR0cnMudHlwZSA9IHR5cGU7XG4gICAgICB9XG4gICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGF0dHJzLmRpc3BTdGFydCA9IHRleHQ7XG4gICAgICB9XG4gICAgICBpZiAoY2xvc2luZ1RleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdHRycy5kaXNwRW5kID0gY2xvc2luZ1RleHQ7XG4gICAgICB9XG4gICAgICB4bWwuc3RhcnRUYWcoJ3BjJywgYXR0cnMpO1xuICAgIH0gZWxzZSBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ0NMT1NFXycpKSB7XG4gICAgICB4bWwuZW5kVGFnKCdwYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhdHRyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICAgaWQ6IGAke3RoaXMuY3VycmVudFBsYWNlaG9sZGVySWQrK31gLFxuICAgICAgICBlcXVpdjogcGxhY2Vob2xkZXJOYW1lLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHR5cGUgPSBnZXRUeXBlRm9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJOYW1lKTtcbiAgICAgIGlmICh0eXBlICE9PSBudWxsKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSB0eXBlO1xuICAgICAgfVxuICAgICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhdHRycy5kaXNwID0gdGV4dDtcbiAgICAgIH1cbiAgICAgIHhtbC5zdGFydFRhZygncGgnLCBhdHRycywge3NlbGZDbG9zaW5nOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVOb3RlKHhtbDogWG1sRmlsZSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgeG1sLnN0YXJ0VGFnKCdub3RlJywge2NhdGVnb3J5OiBuYW1lfSwge3ByZXNlcnZlV2hpdGVzcGFjZTogdHJ1ZX0pO1xuICAgIHhtbC50ZXh0KHZhbHVlKTtcbiAgICB4bWwuZW5kVGFnKCdub3RlJywge3ByZXNlcnZlV2hpdGVzcGFjZTogZmFsc2V9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGlkIGZvciB0aGUgZ2l2ZW4gYG1lc3NhZ2VgLlxuICAgKlxuICAgKiBJZiB0aGVyZSB3YXMgYSBjdXN0b20gaWQgcHJvdmlkZWQsIHVzZSB0aGF0LlxuICAgKlxuICAgKiBJZiB3ZSBoYXZlIHJlcXVlc3RlZCBsZWdhY3kgbWVzc2FnZSBpZHMsIHRoZW4gdHJ5IHRvIHJldHVybiB0aGUgYXBwcm9wcmlhdGUgaWRcbiAgICogZnJvbSB0aGUgbGlzdCBvZiBsZWdhY3kgaWRzIHRoYXQgd2VyZSBleHRyYWN0ZWQuXG4gICAqXG4gICAqIE90aGVyd2lzZSByZXR1cm4gdGhlIGNhbm9uaWNhbCBtZXNzYWdlIGlkLlxuICAgKlxuICAgKiBBbiBYbGlmZiAyLjAgbGVnYWN5IG1lc3NhZ2UgaWQgaXMgYSA2NCBiaXQgbnVtYmVyIGVuY29kZWQgYXMgYSBkZWNpbWFsIHN0cmluZywgd2hpY2ggd2lsbCBoYXZlXG4gICAqIGF0IG1vc3QgMjAgZGlnaXRzLCBzaW5jZSAyXjY1LTEgPSAzNiw4OTMsNDg4LDE0Nyw0MTksMTAzLDIzMS4gVGhpcyBkaWdlc3QgaXMgYmFzZWQgb246XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9ibG9iL21hc3Rlci9zcmMvY29tL2dvb2dsZS9qYXZhc2NyaXB0L2pzY29tcC9Hb29nbGVKc01lc3NhZ2VJZEdlbmVyYXRvci5qYXZhXG4gICAqL1xuICBwcml2YXRlIGdldE1lc3NhZ2VJZChtZXNzYWdlOiDJtVBhcnNlZE1lc3NhZ2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBtZXNzYWdlLmN1c3RvbUlkIHx8XG4gICAgICAgIHRoaXMudXNlTGVnYWN5SWRzICYmIG1lc3NhZ2UubGVnYWN5SWRzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgbWVzc2FnZS5sZWdhY3lJZHMuZmluZChcbiAgICAgICAgICAgIGlkID0+IGlkLmxlbmd0aCA8PSBNQVhfTEVHQUNZX1hMSUZGXzJfTUVTU0FHRV9MRU5HVEggJiYgIS9bXjAtOV0vLnRlc3QoaWQpKSB8fFxuICAgICAgICBtZXNzYWdlLmlkO1xuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgdmFsdWUgb2YgdGhlIGB0eXBlYCBhdHRyaWJ1dGUgZnJvbSB0aGUgYHBsYWNlaG9sZGVyYCBuYW1lLlxuICpcbiAqIElmIHRoZSB0YWcgaXMgbm90IGtub3duIGJ1dCBzdGFydHMgd2l0aCBgVEFHX2AsIGBTVEFSVF9UQUdfYCBvciBgQ0xPU0VfVEFHX2AgdGhlbiB0aGUgdHlwZSBpc1xuICogYG90aGVyYC4gQ2VydGFpbiBmb3JtYXR0aW5nIHRhZ3MgKGUuZy4gYm9sZCwgaXRhbGljLCBldGMpIGhhdmUgdHlwZSBgZm10YC4gTGluZS1icmVha3MsIGltYWdlc1xuICogYW5kIGxpbmtzIGFyZSBzcGVjaWFsIGNhc2VzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlRm9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3QgdGFnID0gcGxhY2Vob2xkZXIucmVwbGFjZSgvXihTVEFSVF98Q0xPU0VfKS8sICcnKTtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlICdCT0xEX1RFWFQnOlxuICAgIGNhc2UgJ0VNUEhBU0lTRURfVEVYVCc6XG4gICAgY2FzZSAnSVRBTElDX1RFWFQnOlxuICAgIGNhc2UgJ0xJTkVfQlJFQUsnOlxuICAgIGNhc2UgJ1NUUklLRVRIUk9VR0hfVEVYVCc6XG4gICAgY2FzZSAnVU5ERVJMSU5FRF9URVhUJzpcbiAgICAgIHJldHVybiAnZm10JztcbiAgICBjYXNlICdUQUdfSU1HJzpcbiAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgIGNhc2UgJ0xJTksnOlxuICAgICAgcmV0dXJuICdsaW5rJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIC9eKFNUQVJUX3xDTE9TRV8pLy50ZXN0KHBsYWNlaG9sZGVyKSA/ICdvdGhlcicgOiBudWxsO1xuICB9XG59XG4iXX0=