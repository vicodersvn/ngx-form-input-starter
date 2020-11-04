import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessorConnector, NgxFormControl, NgxFormErrorAnchorDirective } from '@ngxform/platform';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, takeUntil } from 'rxjs/operators';
import { getControlId, getControlName, getLabel, makeid } from '../../utils';
import { WindowTemplateContext, ResultTemplateContext } from '../../typeahead/typeahead-window';
import { TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadTermChangedEvent } from '../../typeahead/typeahead';
@Component({
  selector: 'ng-bootstrap-typeahead',
  templateUrl: './ng-bootstrap-typeahead.component.html',
  styleUrls: ['./ng-bootstrap-typeahead.component.scss'],
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
  public term: string;
  public ngDestroyed$ = new Subject();
  public search?: (text: Observable<string>) => Observable<readonly any[]>;
  public inputFormatter?: (item: any) => string;
  public resultTemplate: TemplateRef<ResultTemplateContext>;
  public windowTemplate: TemplateRef<WindowTemplateContext>;
  public fullWithWindow = true;
  private focus$ = new Subject<null>();

  @Input() formControl: NgxFormControl;
  @Input() formControlName: string;
  @Input() controlClass: any;

  @ViewChild(NgbTypeahead, { static: false }) ngbTypeahead: NgbTypeahead;
  @ViewChild(NgxFormErrorAnchorDirective, { static: false }) formErrorDirective: NgxFormErrorAnchorDirective;

  public getLabel = getLabel;
  public getControlName = getControlName;
  public getControlId = getControlId(makeid(5));

  @HostBinding('class') get hostClass(): any {
    return this.control.options.ngClass;
  }

  isRisk(value: any, term: undefined | string): boolean {
    return value === undefined && term !== undefined && term !== '';
  }

  onFocus(): void {
    this.focus$.next(null);
  }

  onFocusout(): void {
    if (this.isRisk(this.control.value, this.term)) {
      this.control.setValue(undefined);
    }
  }

  termChanged(value: NgbTypeaheadTermChangedEvent): void {
    this.term = value.term;
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

  init(): void {
    this.control.valueChanges.pipe(takeUntil(this.ngDestroyed$)).subscribe(() => {
      this.formErrorDirective.rerender();
    });

    if (this.control?.options.disabled === true) {
      this.control.disable();
    }

    if (this.control?.options.focus) {
      if (this.control?.options.focus instanceof Subject) {
        this.control.options.focus.pipe(takeUntil(this.ngDestroyed$)).subscribe((val) => {
          if (val === true && this.ngbTypeahead) {
            this.ngbTypeahead.focus();
          }
        });
      } else if (this.control?.options.focus === true) {
        of(this.control?.options.focus)
          .pipe(delay(500))
          .subscribe(() => {
            if (this.ngbTypeahead) {
              this.ngbTypeahead.focus();
            }
          });
      }
    }

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

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
