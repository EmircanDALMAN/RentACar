import { OnChanges, SimpleChanges } from '@angular/core';
/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
export declare class NgbHighlight implements OnChanges {
    parts: string[];
    /**
     * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
     */
    highlightClass: string;
    /**
     * The text highlighting is added to.
     *
     * If the `term` is found inside this text, it will be highlighted.
     * If the `term` contains array then all the items from it will be highlighted inside the text.
     */
    result?: string | null;
    /**
     * The term or array of terms to be highlighted.
     * Since version `v4.2.0` term could be a `string[]`
     */
    term: string | readonly string[];
    ngOnChanges(changes: SimpleChanges): void;
}
