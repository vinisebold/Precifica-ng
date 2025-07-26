import { TestBed } from '@angular/core/testing';

import { Constantes } from './constantes';

describe('Constantes', () => {
  let service: Constantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Constantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
