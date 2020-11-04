import { ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { NgxFormControl, NgxFormControlOption } from '@ngxform/platform';
import { Observable } from 'rxjs';
import { ResultTemplateContext, WindowTemplateContext } from '../../typeahead/typeahead-window';
import { TemplateRef } from '@angular/core';
import { NgBootstrapTypeaheadExtendComponent } from './extend.component';
import { NgxBootstrapTypeaheadOption } from '../basic/ngx-bootstrap-typeahead-control';

export interface NgxBootstrapTypeaheadExtendOption extends NgxBootstrapTypeaheadOption {
  type?: string;
  defaultValue?: any;
  hostAttributes?: string[];
  component?: any;
  ngClass?: any;
  hostClass?: any;
  options?: any[];
  ngbTypeahead?: (text: Observable<string>) => Observable<readonly any[]>;
  resultTemplate?: TemplateRef<ResultTemplateContext>;
  windowTemplate?: TemplateRef<WindowTemplateContext>;
  inputFormatter?: (item: any) => string;
  openOnFocus?: boolean;
}

const hostAttributes = ['hostClass'];

export const NgxBootstrapTypeaheadExtendType = 'NgxBootstrapTypeaheadExtend';

export class NgxBootstrapTypeaheadExtendControl extends NgxFormControl {
  public options: NgxBootstrapTypeaheadOption;
  constructor(
    formState: any = null,
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    options?: NgxBootstrapTypeaheadOption
  ) {
    if (typeof options === 'object' && options.hasOwnProperty('defaultValue')) {
      formState = options.defaultValue;
    }
    options = { ...options, hostAttributes, type: NgxBootstrapTypeaheadExtendType, component: NgBootstrapTypeaheadExtendComponent };
    super(formState, validatorOrOpts, asyncValidator, options);
    this.options = options;
  }
}
