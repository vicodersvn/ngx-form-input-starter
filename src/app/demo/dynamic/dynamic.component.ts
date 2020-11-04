import { NgxBootstrapTypeaheadControl, WindowTemplateContext } from '../../../../projects/ngxform/ng-bootstrap-typeahead/src/public-api';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  public demoForm: NgxFormGroup;
  @ViewChild('windowTemplate', { static: true }) windowTemplate: TemplateRef<WindowTemplateContext>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => {
          if (term !== undefined && term !== '') {
            return this.http.get(`https://restcountries.eu/rest/v2/name/${term.toLowerCase()}`).pipe(catchError((error) => error));
          } else {
            return this.http.get('https://restcountries.eu/rest/v2/all').pipe(catchError((error) => error));
          }
        }),
        map((data: any[]) => {
          return data.map((item) => Object.assign(item, { key: item.name }));
        })
      );
    this.demoForm = new NgxFormGroup({
      typeahead: new NgxBootstrapTypeaheadControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        inputFormatter: (item: any) => item.name,
        ngbTypeahead: search,
        windowTemplate: this.windowTemplate,
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
