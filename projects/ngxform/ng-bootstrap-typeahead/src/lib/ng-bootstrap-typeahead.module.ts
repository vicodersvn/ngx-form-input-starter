import { NgModule } from '@angular/core';
import { NgBootstrapTypeaheadComponent } from './controls/basic/ng-bootstrap-typeahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { CommonModule } from '@angular/common';
import { NgbHighlight, NgbTypeaheadModule } from './typeahead/typeahead.module';
import { NgBootstrapTypeaheadExtendComponent } from './controls/extend/extend.component';

@NgModule({
  declarations: [NgBootstrapTypeaheadComponent, NgBootstrapTypeaheadExtendComponent],
  imports: [NgbTypeaheadModule, CommonModule, FormsModule, ReactiveFormsModule, NgxFormModule],
  exports: [NgbHighlight]
})
export class NgxFormTypeaheadModule {}
