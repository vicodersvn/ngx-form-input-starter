import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxBootstrapTypeaheadControl, WindowTemplateContext } from '@ngxform/ng-bootstrap-typeahead';

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
        defaultValue: {
          name: 'Viet Nam',
          topLevelDomain: ['.vn'],
          alpha2Code: 'VN',
          alpha3Code: 'VNM',
          callingCodes: ['84'],
          capital: 'Hanoi',
          altSpellings: ['VN', 'Socialist Republic of Vietnam', 'Cộng hòa Xã hội chủ nghĩa Việt Nam'],
          region: 'Asia',
          subregion: 'South-Eastern Asia',
          population: 92700000,
          latlng: [16.16666666, 107.83333333],
          demonym: 'Vietnamese',
          area: 331212.0,
          gini: 35.6,
          timezones: ['UTC+07:00'],
          borders: ['KHM', 'CHN', 'LAO'],
          nativeName: 'Việt Nam',
          numericCode: '704',
          currencies: [{ code: 'VND', name: 'Vietnamese đồng', symbol: '₫' }],
          languages: [{ iso639_1: 'vi', iso639_2: 'vie', name: 'Vietnamese', nativeName: 'Tiếng Việt' }],
          translations: {
            de: 'Vietnam',
            es: 'Vietnam',
            fr: 'Viêt Nam',
            ja: 'ベトナム',
            it: 'Vietnam',
            br: 'Vietnã',
            pt: 'Vietname',
            nl: 'Vietnam',
            hr: 'Vijetnam',
            fa: 'ویتنام'
          },
          flag: 'https://restcountries.eu/data/vnm.svg',
          regionalBlocs: [{ acronym: 'ASEAN', name: 'Association of Southeast Asian Nations', otherAcronyms: [], otherNames: [] }],
          cioc: 'VIE'
        },
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
