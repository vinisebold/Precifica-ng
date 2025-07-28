import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPrecos } from './formulario-precos';

describe('FormularioPrecos', () => {
  let component: FormularioPrecos;
  let fixture: ComponentFixture<FormularioPrecos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPrecos],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPrecos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
