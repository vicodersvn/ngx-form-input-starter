// eslint-disable-file no-host-metadata-property
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

import { toString } from '../util/util';

/**
 * The context for the typeahead result template in case you want to override the default one.
 */
export interface ResultTemplateContext {
  /**
   * Your typeahead result item.
   */
  result: any;

  /**
   * Search term from the `<input>` used to get current result.
   */
  term: string;
}

export interface WindowTemplateContext {
  /**
   * Your typeahead result item.
   */
  results: any[];

  /**
   * Search term from the `<input>` used to get current result.
   */
  term: string;

  /**
   * The function that converts an item from the result list to a `string` to display in the `<input>` field.
   *
   * It is called when the user selects something in the popup or the model value changes, so the input needs to
   * be updated.
   */

  fomatter: (item: any) => string;
}

@Component({
  selector: 'ngb-typeahead-window',
  exportAs: 'ngbTypeaheadWindow',
  encapsulation: ViewEncapsulation.None,
  host: { '(mousedown)': '$event.preventDefault()', class: 'dropdown-menu show', role: 'listbox', '[id]': 'id' },
  templateUrl: './typeahead-window.html'
})
export class NgbTypeaheadWindow implements OnInit {
  activeIdx = 0;

  /**
   *  The id for the typeahead window. The id should be unique and the same
   *  as the associated typeahead's id.
   */
  @Input() id: string;

  /**
   * Flag indicating if the first row should be active initially
   */
  @Input() focusFirst = true;

  /**
   * Typeahead match results to be displayed
   */
  @Input() results;

  /**
   * Search term used to get current results
   */
  @Input() term: string;

  /**
   * A function used to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() formatter = toString;

  /**
   * A template to override a matching result default display
   */
  @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

  /**
   * A template to override a matching the window default display
   */
  @Input() windowTemplate: TemplateRef<WindowTemplateContext>;

  /**
   * Event raised when user selects a particular result row
   */
  @Output('select') selectEvent = new EventEmitter();

  @Output('activeChange') activeChangeEvent = new EventEmitter();

  hasActive() {
    return this.activeIdx > -1 && this.activeIdx < this.results.length;
  }

  getActive() {
    return this.results[this.activeIdx];
  }

  markActive = (activeIdx: number) => {
    this.activeIdx = activeIdx;
    this._activeChanged();
  };

  next() {
    if (this.activeIdx === this.results.length - 1) {
      this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
    } else {
      this.activeIdx++;
    }
    this._activeChanged();
  }

  prev() {
    if (this.activeIdx < 0) {
      this.activeIdx = this.results.length - 1;
    } else if (this.activeIdx === 0) {
      this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
    } else {
      this.activeIdx--;
    }
    this._activeChanged();
  }

  resetActive() {
    this.activeIdx = this.focusFirst ? 0 : -1;
    this._activeChanged();
  }

  select = (item) => {
    this.selectEvent.emit(item);
  };

  ngOnInit() {
    this.resetActive();
  }

  private _activeChanged() {
    this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
  }
}
