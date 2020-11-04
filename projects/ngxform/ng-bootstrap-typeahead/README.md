# Vicoders NgxForm Bootstrap Typeahead

Add bootstrap typeahead control to NgxForm

- [Vicoders NgxForm Bootstrap Typeahead](#vicoders-ngxform-bootstrap-typeahead)
  - [Install](#install)
  - [Input Option](#input-option)
  - [Usage](#usage)
    - [Simple typeahead](#simple-typeahead)
    - [Custom template](#custom-template)
      - [Custom Result Template](#custom-result-template)
      - [Custom Window Template](#custom-window-template)

<a name="install"></a>

## Install

Install package

```
yarn add @ngxform/ng-bootstrap-typeahead
```

Import module

```js
import { NgxFormTypeaheadModule } from '@ngxform/ng-bootstrap-typeahead';
...

@NgModule({
  ...
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    NgxFormTypeaheadModule
  ],
})
```
<a name="usage"></a>

## Input Option

```js
interface NgxBootstrapTypeaheadOption extends NgxFormControlOption {
  defaultValue?: any;
  hostClass?: any;
  ngClass?: any;
  options?: any[];
  ngbTypeahead?: (text: Observable<string>) => Observable<readonly any[]>;
  resultTemplate?: TemplateRef<ResultTemplateContext>;
  windowTemplate?: TemplateRef<WindowTemplateContext>;
  inputFormatter?: (item: any) => string;
  openOnFocus?: boolean;
  focus?: boolean | Subject<boolean>;
  disabled?: boolean;
  fullWithWindow?: boolean;
}
```

## Usage

<a name="simple-typeahead"></a>

### Simple typeahead

simple-typeahead.component.html

```html
<form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
  <ng-template ngxFormAnchor [controls]="demoForm.controls"></ng-template>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

simple-typeahead.component.ts
```js
import { NgxBootstrapTypeaheadControl } from '@ngxform/ng-bootstrap-typeahead';
import { Component, OnInit } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class SimpleTypeaheadComponent implements OnInit {
  public demoForm: NgxFormGroup;

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
      typeahead: new NgxBootstrapTypeaheadControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        options: typeaheadOptions,
        inputFormatter: (item: any) => item.name,
        openOnFocus: true,
        errorMessages: [
          { key: 'required', message: 'This field is required' },
        ]
      })
    });
  }

  onSubmit(): void {
    this.demoForm.submitted = true;
    console.log(this.demoForm.value);
  }
}

```

<a name="custom-template"></a>

### Custom template

<a name="custom-result-template"></a>

#### Custom Result Template

custom-result-template.component.html
```html
<ng-template #resultTemplate let-r="result" let-t="term">
  <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px">
  {{r.name}}
</ng-template>
<form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
  <ng-template ngxFormAnchor [controls]="demoForm.controls"></ng-template>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

custom-result-template.component.ts
```js
import { NgxBootstrapTypeaheadControl } from '@ngxform/ng-bootstrap-typeahead';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class CustomResultTemplateComponent implements OnInit {
  public demoForm: NgxFormGroup;

  @ViewChild('resultTemplate', { static: true }) resultTemplate: TemplateRef<any>;

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
      typeahead: new NgxBootstrapTypeaheadControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        options: typeaheadOptions,
        resultTemplate: this.resultTemplate,
        inputFormatter: (item: any) => item.name,
        openOnFocus: true,
        errorMessages: [
          { key: 'required', message: 'This field is required' },
        ]
      })
    });
  }

  onSubmit(): void {
    this.demoForm.submitted = true;
    console.log(this.demoForm.value);
  }
}

```


<a name="custom-window-template"></a>

#### Custom Window Template


custom-window-template.component.html
```html
<ng-template #windowTemplate let-results="results" let-term="term" let-formatter="formatter" let-markActive="markActive" let-select="select" let-activeIdx="activeIdx">
  <ng-template #rt let-r="result" let-t="term">
    <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px" />
    {{ r.name }}
  </ng-template>
  <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
    <button type="button" class="dropdown-item" role="option" [id]="id + '-' + idx" [class.active]="idx === activeIdx" (mouseenter)="markActive(idx)" (click)="select(result)">
      <ng-template [ngTemplateOutlet]="resultTemplate || rt" [ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"></ng-template>
    </button>
  </ng-template>
</ng-template>

<form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
  <ng-template ngxFormAnchor [controls]="demoForm.controls"></ng-template>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

custom-window-template.component.ts
```js

import { NgxBootstrapTypeaheadControl, WindowTemplateContext } from '@ngxform/ng-bootstrap-typeahead';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxFormGroup } from '@ngxform/platform';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class CustomWindowTemplateComponent implements OnInit {
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
      typeahead: new NgxBootstrapTypeaheadControl('', [Validators.required, Validators.email, Validators.minLength(3)], [], {
        label: 'NgBootstrap Typeahead',
        controlClass: ['form-control'],
        ngClass: 'd-flex flex-column form-group',
        options: typeaheadOptions,
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



```
