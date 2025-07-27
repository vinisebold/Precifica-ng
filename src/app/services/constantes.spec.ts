import { TestBed } from '@angular/core/testing';

import { ConstantesService } from './constantes';

describe('Constantes', () => {
  let service: ConstantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
