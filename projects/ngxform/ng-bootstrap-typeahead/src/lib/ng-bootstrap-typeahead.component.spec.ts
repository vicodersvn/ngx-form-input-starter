import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapTypeaheadComponent } from './ng-bootstrap-typeahead.component';

describe('NgBootstrapTypeaheadComponent', () => {
  let component: NgBootstrapTypeaheadComponent;
  let fixture: ComponentFixture<NgBootstrapTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgBootstrapTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
