import { NgxBootstrapTypeaheadControl, WindowTemplateContext } from '../../../../projects/ngxform/ng-bootstrap-typeahead/src/public-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgxFormGroup } from '@ngxform/platform';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public demoForm: NgxFormGroup;

  @ViewChild('typeaheadOptionTemplate', { static: true }) typeaheadOptionTemplate: TemplateRef<any>;
  @ViewChild('windowTemplate', { static: true }) windowTemplate: TemplateRef<WindowTemplateContext>;

  constructor(private http: HttpClient) {}

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
    const search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((term) => term !== undefined && term !== null && term !== ''),
        switchMap((term) => this.http.get(`https://restcountries.eu/rest/v2/name/${term.toLowerCase()}`).pipe(catchError((error) => error))),

        map((data: any[]) => {
          return data.map((item) => Object.assign(item, { key: item.name }));
        })
      );
    const formatter = (item: any) => item.name;
    this.demoForm = new NgxFormGroup({
      typeahead: new NgxBootstrapTypeaheadControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        options: typeaheadOptions,
        ngbTypeahead: search,
        // resultTemplate: this.typeaheadOptionTemplate,
        // windowTemplate: this.windowTemplate,
        // resultTemplateLabelFormatter: (item: any) => item.name,
        inputFormatter: formatter,
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
