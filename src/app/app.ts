import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPrecos } from './components/formulario-precos/formulario-precos';
import { VisualizadorRelatorio } from './components/visualizador-relatorio/visualizador-relatorio';
import { Loading } from './components/loading/loading';
import { RelatorioService } from './services/relatorio';
import { Relatorio } from './models/relatorio';

type TelasApp = 'formulario' | 'relatorio';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormularioPrecos, VisualizadorRelatorio, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public telaAtual: TelasApp = 'formulario';
  public relatorioAtual: Relatorio | null = null;
  public carregando: boolean = false;
  public mensagemCarregamento: string = 'Processando...';

  constructor(private relatorioService: RelatorioService) {}

  /**
   * Manipula a geração do relatório
   */
  public async onRelatorioGerado(dados: {
    titulo: string;
    precos: { [key: string]: number };
  }): Promise<void> {
    try {
      this.mostrarCarregamento('Gerando relatório...');

      // Simula tempo de processamento
      await this.delay(800);

      const relatorio = this.relatorioService.gerarRelatorio(
        dados.titulo,
        dados.precos
      );

      if (relatorio) {
        this.relatorioAtual = relatorio;
        this.telaAtual = 'relatorio';
      } else {
        this.mostrarAlerta(
          'Erro ao gerar relatório. Verifique se há pelo menos um preço preenchido.'
        );
      }
    } catch (erro) {
      console.error('Erro ao gerar relatório:', erro);
      this.mostrarAlerta(
        'Erro inesperado ao gerar relatório. Tente novamente.'
      );
    } finally {
      this.ocultarCarregamento();
    }
  }

  /**
   * Volta para o formulário
   */
  public voltarParaFormulario(): void {
    this.telaAtual = 'formulario';
    this.relatorioAtual = null;
  }

  /**
   * Mostra o indicador de carregamento
   */
  private mostrarCarregamento(mensagem: string = 'Processando...'): void {
    this.mensagemCarregamento = mensagem;
    this.carregando = true;
  }

  /**
   * Oculta o indicador de carregamento
   */
  private ocultarCarregamento(): void {
    this.carregando = false;
  }

  /**
   * Mostra um alerta para o usuário
   */
  private mostrarAlerta(mensagem: string): void {
    alert(mensagem);
  }

  /**
   * Função auxiliar para delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
