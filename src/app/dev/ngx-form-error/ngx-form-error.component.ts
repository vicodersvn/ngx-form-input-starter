import { Component, Input } from '@angular/core';
import { NgxFormControl, NgxFormControlValidationError } from '@ngxform/platform';

@Component({
  selector: 'ngx-form-error',
  templateUrl: './ngx-form-error.component.html',
  styleUrls: ['./ngx-form-error.component.scss']
})
export class NgxFormErrorComponent {
  @Input() control: NgxFormControl;
  @Input() errors: NgxFormControlValidationError[] = [];

  get submitted(): boolean {
    return (this.control?.parent as any).submitted || false;
  }
}
