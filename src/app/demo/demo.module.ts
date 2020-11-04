import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { BasicComponent } from './basic/basic.component';
import { NgxFormTypeaheadModule } from '../../../projects/ngxform/ng-bootstrap-typeahead/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NgxFormUiModule } from '@ngxform/ui';
import { HttpClientModule } from '@angular/common/http';
import { ExtendComponent } from './extend/extend.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [BasicComponent, ExtendComponent, DynamicComponent],
  imports: [CommonModule, HttpClientModule, DemoRoutingModule, FormsModule, ReactiveFormsModule, NgxFormModule, NgxFormUiModule, NgxFormTypeaheadModule]
})
export class DemoModule {}
