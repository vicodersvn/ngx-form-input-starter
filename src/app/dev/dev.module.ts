import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevRoutingModule } from './dev-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NgxFormUiModule } from '@ngxform/ui';
import { NgxFormCommonModule } from '@ngxform/common';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, DevRoutingModule, FormsModule, ReactiveFormsModule, NgxFormModule, NgxFormUiModule, NgxFormCommonModule]
})
export class DevModule {}
