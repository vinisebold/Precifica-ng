import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Relatorio } from '../../models/relatorio';
import { RelatorioService } from '../../services/relatorio';
import { CompartilhamentoService } from '../../services/compartilhamento';
import { ConstantesService } from '../../services/constantes';

@Component({
  selector: 'app-visualizador-relatorio',
  imports: [CommonModule],
  templateUrl: './visualizador-relatorio.html',
  styleUrl: './visualizador-relatorio.css',
})
export class VisualizadorRelatorio {
  @Input() relatorio!: Relatorio;
  @Input() categoriasSelecionadas?: { [categoria: string]: boolean };
  @Output() voltarClicado = new EventEmitter<void>();

  public compartilhando: boolean = false;

  constructor(
    public relatorioService: RelatorioService,
    private compartilhamentoService: CompartilhamentoService,
    private constantesService: ConstantesService
  ) {}

  ngOnInit(): void {
    // Inicialização vazia, sem lógica de estatísticas
  }

  get produtosFiltrados() {
    if (!this.categoriasSelecionadas) return this.relatorio.produtos;
    
    // Cria um mapa de produtos do relatório
    const produtosRelatorio = new Map(this.relatorio.produtos.map(p => [p.nome, p]));
    // Monta a lista ordenada e filtrada
    const produtosOrdenados: any[] = [];
    for (const grupo of this.constantesService.PRODUTOS_CATEGORIZADOS) {
      if (!this.categoriasSelecionadas[grupo.categoria]) continue;
      for (const nomeProduto of grupo.produtos) {
        if (produtosRelatorio.has(nomeProduto)) {
          produtosOrdenados.push(produtosRelatorio.get(nomeProduto));
        }
      }
    }
    return produtosOrdenados;
  }

  public async compartilhar(): Promise<void> {
    try {
      this.compartilhando = true;
      await this.compartilhamentoService.compartilharRelatorioComoTexto({
        ...this.relatorio,
        categoriasSelecionadas: this.categoriasSelecionadas
      });
    } catch (erro) {
      console.error('Erro ao compartilhar:', erro);
      alert('Erro ao compartilhar. Tente novamente.');
    } finally {
      this.compartilhando = false;
    }
  }

  public voltar(): void {
    this.voltarClicado.emit();
  }
}