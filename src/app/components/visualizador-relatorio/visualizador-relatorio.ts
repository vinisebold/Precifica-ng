import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Relatorio } from '../../models/relatorio';
import { RelatorioService } from '../../services/relatorio';
import { CompartilhamentoService } from '../../services/compartilhamento';

@Component({
  selector: 'app-visualizador-relatorio',
  imports: [CommonModule],
  templateUrl: './visualizador-relatorio.html',
  styleUrl: './visualizador-relatorio.css',
})
export class VisualizadorRelatorio {
  @Input() relatorio!: Relatorio;
  @Output() voltarClicado = new EventEmitter<void>();

  public compartilhando: boolean = false;
  public mostrarEstatisticas: boolean = false;
  public estatisticas: any = {};
  public mostrarSelecaoCompartilhamento: boolean = false;

  constructor(
    public relatorioService: RelatorioService,
    private compartilhamentoService: CompartilhamentoService
  ) {}

  ngOnInit(): void {
    this.calcularEstatisticas();
  }

  private calcularEstatisticas(): void {
    this.estatisticas = this.relatorioService.calcularEstatisticas(
      this.relatorio.produtos
    );
  }

  public async compartilhar(): Promise<void> {
    this.mostrarSelecaoCompartilhamento = true;
  }

  public async compartilharComoImagem(): Promise<void> {
    this.mostrarSelecaoCompartilhamento = false;
    try {
      this.compartilhando = true;
      await this.compartilhamentoService.compartilharRelatorio(this.relatorio);
    } catch (erro) {
      console.error('Erro ao compartilhar:', erro);
      alert('Erro ao compartilhar. Tente novamente.');
    } finally {
      this.compartilhando = false;
    }
  }

  public async compartilharComoTexto(): Promise<void> {
    this.mostrarSelecaoCompartilhamento = false;
    try {
      this.compartilhando = true;
      await this.compartilhamentoService.compartilharRelatorioComoTexto(this.relatorio);
    } catch (erro) {
      console.error('Erro ao compartilhar:', erro);
      alert('Erro ao compartilhar. Tente novamente.');
    } finally {
      this.compartilhando = false;
    }
  }

  public cancelarCompartilhamento(): void {
    this.mostrarSelecaoCompartilhamento = false;
  }

  public toggleEstatisticas(): void {
    this.mostrarEstatisticas = !this.mostrarEstatisticas;
  }

  public voltar(): void {
    this.voltarClicado.emit();
  }
}
