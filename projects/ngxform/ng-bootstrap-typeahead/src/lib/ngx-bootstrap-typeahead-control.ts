import { ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { NgxFormControl, NgxFormControlOption } from '@ngxform/platform';
import { Observable } from 'rxjs';
import { NgBootstrapTypeaheadComponent } from './ng-bootstrap-typeahead.component';

export interface NgxBootstrapTypeaheadOption extends NgxFormControlOption {
  type?: string;
  defaultValue?: any;
  hostAttributes?: string[];
  component?: any;
  ngClass?: any;
  hostClass?: any;
  options: any[];
  ngbTypeahead?: (text: Observable<string>) => Observable<readonly any[]>;
  inputFormatter?: (item: any) => string;
}

const hostAttributes = ['hostClass'];

export const NgxBootstrapTypeaheadType = 'NgxBootstrapTypeahead';

export class NgxBootstrapTypeaheadControl extends NgxFormControl {
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
    options = { ...options, hostAttributes, type: NgxBootstrapTypeaheadType, component: NgBootstrapTypeaheadComponent };
    super(formState, validatorOrOpts, asyncValidator, options);
    this.options = options;
  }
}