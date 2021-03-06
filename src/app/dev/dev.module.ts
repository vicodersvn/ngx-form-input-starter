import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevRoutingModule } from './dev-routing.module';
import { FormComponent } from './form/form.component';
import { NgxFormTypeaheadModule } from '../../../projects/ngxform/ng-bootstrap-typeahead/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NgxFormUiModule } from '@ngxform/ui';
import { NgxFormCommonModule } from '@ngxform/common';
import { NgxFormErrorComponent } from './ngx-form-error/ngx-form-error.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FormComponent, NgxFormErrorComponent],
  imports: [
    CommonModule,
    DevRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule.forRoot({ validationErrorComponent: NgxFormErrorComponent }),
    NgxFormUiModule,
    NgxFormCommonModule,
    NgxFormTypeaheadModule
  ],
  entryComponents: [NgxFormErrorComponent]
})
export class DevModule {}
