import { TestBed } from '@angular/core/testing';

import { Compartilhamento } from './compartilhamento';

describe('Compartilhamento', () => {
  let service: Compartilhamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Compartilhamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
