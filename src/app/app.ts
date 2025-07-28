import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPrecos } from './components/formulario-precos/formulario-precos';
import { VisualizadorRelatorio } from './components/visualizador-relatorio/visualizador-relatorio';
import { Loading } from './components/loading/loading';
import { HeaderComponent } from './components/header/header';
import { ConfiguracoesCategoriasComponent } from './components/configuracoes-categorias/configuracoes-categorias';
import { RelatorioService } from './services/relatorio';
import { Relatorio } from './models/relatorio';

type TelasApp = 'formulario' | 'relatorio';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormularioPrecos,
    VisualizadorRelatorio,
    Loading,
    HeaderComponent,
    // Import do novo componente de configurações
    ConfiguracoesCategoriasComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild('formularioPrecos') formularioPrecos?: FormularioPrecos;

  public telaAtual: TelasApp = 'formulario';
  public relatorioAtual: Relatorio | null = null;
  public carregando: boolean = false;
  public mensagemCarregamento: string = 'Processando...';
  public mostrarConfiguracoes: boolean = false; // Nova propriedade para o modal de configurações

  constructor(private relatorioService: RelatorioService) {}

  // Descrição dinâmica para o header
  public get descricaoHeader(): string {
    return this.telaAtual === 'formulario'
      ? 'Preencha os preços e gere seu relatório'
      : 'Visualize e compartilhe seu relatório';
  }

  /**
   * Abre o modal de configurações
   */
  public abrirModalConfiguracoes(): void {
    this.mostrarConfiguracoes = true;
  }

  /**
   * Fecha o modal de configurações
   */
  public fecharModalConfiguracoes(): void {
    console.log('App: fecharModalConfiguracoes chamado.');
    this.mostrarConfiguracoes = false;
    // Forçar a atualização do formulário de preços se necessário
    // this.formularioPrecos?.carregarConfiguracoesCategorias(); // Se não for automático via Subject
  }

  /**
   * Manipula a geração do relatório
   */
  public async onRelatorioGerado(dados: {
    titulo: string;
    precos: { [key: string]: number };
  }): Promise<void> {
    console.log('App: onRelatorioGerado chamado.');
    try {
      this.mostrarCarregamento('Gerando relatório...');
      await this.delay(543);

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
