import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';
import { NgxBootstrapTypeaheadExtendControl, WindowTemplateContext } from '@ngxform/ng-bootstrap-typeahead';

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss']
})
export class ExtendComponent implements OnInit {
  public demoForm: NgxFormGroup;

  @ViewChild('windowTemplate', { static: true }) windowTemplate: TemplateRef<WindowTemplateContext>;

  ngOnInit(): void {
    const typeaheadOptions: { name: string; flag: string }[] = [
      { name: 'Alabama', flag: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
      { name: 'Alaska', flag: 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
      { name: 'Arizona', flag: '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png' },
      { name: 'Arkansas', flag: '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png' },
      { name: 'California', flag: '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png' },
      { name: 'Colorado', flag: '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png' },
      { name: 'Connecticut', flag: '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png' },
      { name: 'Delaware', flag: 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png' },
      { name: 'Florida', flag: 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png' }
    ];
    this.demoForm = new NgxFormGroup({
      typeahead: new NgxBootstrapTypeaheadExtendControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        options: typeaheadOptions,
        defaultValue: typeaheadOptions[0],
        inputFormatter: (item: any) => item.name,
        openOnFocus: true,
        errorMessages: [
          { key: 'required', message: 'This field is required' },
          { key: 'email', message: 'Email is invalid' },
          { key: 'minlength', message: 'Min length is 3' }
        ]
      })
    });
  }

  onSubmit(): void {
    this.demoForm.submitted = true;
    console.log(this.demoForm.value);
  }
}
