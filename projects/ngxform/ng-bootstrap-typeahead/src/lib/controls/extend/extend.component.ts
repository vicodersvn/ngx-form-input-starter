import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent, NgbTypeaheadTermChangedEvent } from '../../typeahead/typeahead';
import { NgBootstrapTypeaheadComponent } from '../basic/ng-bootstrap-typeahead.component';

@Component({
  selector: 'lib-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NgBootstrapTypeaheadExtendComponent,
      multi: true
    }
  ]
})
export class NgBootstrapTypeaheadExtendComponent extends NgBootstrapTypeaheadComponent implements OnInit {
  public showWarning: boolean;
  public fullWithWindow = true;
  public disabled: boolean;

  ngOnInit(): void {
    this.init();
  }

  focusout(): void {
    if (this.isRisk(this.control.value, this.term)) {
      this.showWarning = true;
      this.control.setValue(undefined);
    }
  }

  termChanged(value: NgbTypeaheadTermChangedEvent): void {
    this.term = value.term;
  }

  selectItem(value: NgbTypeaheadSelectItemEvent): void {
    if (value.item !== undefined) {
      this.showWarning = false;
    }
  }
}
