import { TestBed } from '@angular/core/testing';

import { CompartilhamentoService } from './compartilhamento';

describe('Compartilhamento', () => {
  let service: CompartilhamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartilhamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
