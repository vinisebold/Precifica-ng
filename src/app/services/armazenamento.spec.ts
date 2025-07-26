import { TestBed } from '@angular/core/testing';

import { Armazenamento } from './armazenamento';

describe('Armazenamento', () => {
  let service: Armazenamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Armazenamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
