import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessorConnector, NgxFormControl, NgxFormErrorAnchorDirective } from '@ngxform/platform';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { getControlId, getControlName, getLabel, makeid } from '../../utils';
import { WindowTemplateContext, ResultTemplateContext } from '../../typeahead/typeahead-window';
import { TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'ng-bootstrap-typeahead',
  templateUrl: './ng-bootstrap-typeahead.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgBootstrapTypeaheadComponent,
      multi: true
    }
  ]
})
export class NgBootstrapTypeaheadComponent extends ControlValueAccessorConnector implements OnInit, OnDestroy {
  public model: any;
  public ngDestroyed$ = new Subject();
  public search?: (text: Observable<string>) => Observable<readonly any[]>;
  public inputFormatter?: (item: any) => string;
  public resultTemplate: TemplateRef<ResultTemplateContext>;
  public windowTemplate: TemplateRef<WindowTemplateContext>;
  private focus$ = new Subject<null>();

  @Input() formControl: NgxFormControl;
  @Input() formControlName: string;
  @Input() controlClass: any;

  @ViewChild(NgxFormErrorAnchorDirective, { static: false }) formErrorDirective: NgxFormErrorAnchorDirective;

  public getLabel = getLabel;
  public getControlName = getControlName;
  public getControlId = getControlId(makeid(5));

  @HostBinding('class') get hostClass(): any {
    return this.control.options.ngClass;
  }

  focus() {
    this.focus$.next(null);
  }

  get combied_classes(): any {
    return this.controlClass || this.control.options.controlClass;
  }

  get submitted(): boolean {
    return this.control.parent.submitted;
  }

  get placeholder(): boolean {
    return this.control.options.placeholder ? this.control.options.placeholder : '';
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.ngDestroyed$)).subscribe(() => {
      this.formErrorDirective.rerender();
    });

    this.resultTemplate = this.control?.options.resultTemplate ? this.control.options.resultTemplate : undefined;
    this.windowTemplate = this.control?.options.windowTemplate ? this.control.options.windowTemplate : undefined;

    if (this.control?.options.ngbTypeahead !== undefined) {
      this.search = this.control.options.ngbTypeahead;
    } else if (this.control?.options.options !== undefined) {
      this.search = (text$: Observable<string>) =>
        merge(text$, this.focus$.pipe(filter(() => this.control?.options.openOnFocus === true))).pipe(
          debounceTime(200),
          map((term) => {
            return term === '' || term === null || term === undefined
              ? this.control.options.options
              : this.control.options.options.filter((v) => this.inputFormatter(v).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          })
        );
    } else {
      throw new Error('Either ngbTypeahead or options should be passed');
    }

    this.inputFormatter = this.control?.options.inputFormatter ? this.control.options.inputFormatter : (item) => item.toString();
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
