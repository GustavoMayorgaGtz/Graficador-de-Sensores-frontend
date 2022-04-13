import { TestBed } from '@angular/core/testing';

import { GetInformationControllersService } from './get-information-controllers.service';

describe('GetInformationControllersService', () => {
  let service: GetInformationControllersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInformationControllersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
