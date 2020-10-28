import { TestBed } from '@angular/core/testing';

import { NgBootstrapTypeaheadService } from './ng-bootstrap-typeahead.service';

describe('NgBootstrapTypeaheadService', () => {
  let service: NgBootstrapTypeaheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgBootstrapTypeaheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
