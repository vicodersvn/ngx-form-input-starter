import { NgModule } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapTypeaheadComponent } from './ng-bootstrap-typeahead.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgBootstrapTypeaheadComponent],
  imports: [NgbTypeaheadModule, CommonModule, FormsModule, ReactiveFormsModule, NgxFormModule],
  exports: [NgBootstrapTypeaheadComponent]
})
export class NgBootstrapTypeaheadModule {}
