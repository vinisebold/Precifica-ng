import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorRelatorio } from './visualizador-relatorio';

describe('VizualizadorRelatorio', () => {
  let component: VisualizadorRelatorio;
  let fixture: ComponentFixture<VisualizadorRelatorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizadorRelatorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizadorRelatorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
