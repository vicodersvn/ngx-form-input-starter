import { NgModule } from '@angular/core';
import { NgBootstrapTypeaheadComponent } from './controls/basic/ng-bootstrap-typeahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from './typeahead/typeahead.module';

@NgModule({
  declarations: [NgBootstrapTypeaheadComponent],
  imports: [NgbTypeaheadModule, CommonModule, FormsModule, ReactiveFormsModule, NgxFormModule],
  exports: [NgBootstrapTypeaheadComponent]
})
export class NgxFormTypeaheadModule {}
