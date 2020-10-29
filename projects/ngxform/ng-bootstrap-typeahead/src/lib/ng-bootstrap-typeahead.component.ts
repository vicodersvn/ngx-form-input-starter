import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessorConnector, NgxFormControl, NgxFormErrorAnchorDirective } from '@ngxform/platform';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { getControlId, getControlName, getLabel, makeid } from './utils';
import { TemplateRef } from '@angular/core';
@Component({
  selector: 'ng-bootstrap-typeahead',
  templateUrl: './ng-bootstrap-typeahead.component.html',
  styles: []
})
export class NgBootstrapTypeaheadComponent extends ControlValueAccessorConnector implements OnInit, OnDestroy {
  public model: any;
  public ngDestroyed$ = new Subject();
  public search?: (text: Observable<string>) => Observable<readonly any[]>;
  public formatter?: (item: any) => string;
  public resultTemplateLabelFormatter: (item: any) => Observable<string> | string;
  public resultTemplate: TemplateRef<any>;

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

    this.resultTemplateLabelFormatter = this.control?.options.resultTemplateLabelFormatter ? this.control.options.resultTemplateLabelFormatter : (item) => item.key;

    this.search = this.control?.options.ngbTypeahead
      ? this.control.options.ngbTypeahead
      : (text$: Observable<string>) =>
          text$.pipe(
            debounceTime(200),
            map((term) => (term === '' ? [] : this.control.options.options.filter((v) => v.key.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))
          );

    this.formatter = this.control?.options.inputFormatter ? this.control.options.inputFormatter : (item) => item.toString();
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
