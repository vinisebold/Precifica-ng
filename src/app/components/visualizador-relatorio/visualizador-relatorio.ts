import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Relatorio, ProdutoComPreco } from '../../models/relatorio';
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
  @Output() voltarClicado = new EventEmitter<void>();

  public compartilhando: boolean = false;

  constructor(
    public relatorioService: RelatorioService,
    private compartilhamentoService: CompartilhamentoService,
    private constantesService: ConstantesService
  ) {}

  /**
   * Ordena os produtos do relatório atual com base na ordem definida em ConstantesService.PRODUTOS.
   * Produtos que estão no relatório mas não na lista de constantes são adicionados ao final.
   */
  get produtosFiltrados(): ProdutoComPreco[] {
    const produtosDoRelatorio = new Map(
      this.relatorio.produtos.map((p) => [p.nome, p])
    );
    const produtosOrdenados: ProdutoComPreco[] = [];

    for (const nomeProduto of this.constantesService.PRODUTOS) {
      if (produtosDoRelatorio.has(nomeProduto)) {
        produtosOrdenados.push(produtosDoRelatorio.get(nomeProduto)!);
      }
    }

    const nomesJaAdicionados = new Set(produtosOrdenados.map((p) => p.nome));
    for (const produto of this.relatorio.produtos) {
      if (!nomesJaAdicionados.has(produto.nome)) {
        produtosOrdenados.push(produto);
      }
    }

    return produtosOrdenados;
  }

  public async compartilhar(): Promise<void> {
    try {
      this.compartilhando = true;
      await this.compartilhamentoService.compartilharRelatorioComoTexto({
        ...this.relatorio,
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
