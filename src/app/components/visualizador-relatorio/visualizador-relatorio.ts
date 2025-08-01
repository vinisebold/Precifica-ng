import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Relatorio, ProdutoComPreco } from '../../models/relatorio';
import { RelatorioService } from '../../services/relatorio';
import { CompartilhamentoService } from '../../services/compartilhamento';
import {
  ConstantesService,
  Categoria,
  Produto,
} from '../../services/constantes';

@Component({
  selector: 'app-visualizador-relatorio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './visualizador-relatorio.html',
  styleUrls: ['./visualizador-relatorio.css'],
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
  private get produtosFiltrados(): ProdutoComPreco[] {
    const produtosDoRelatorio = new Map(
      this.relatorio.produtos.map((p) => [p.nome, p])
    );
    const produtosOrdenados: ProdutoComPreco[] = [];

    for (const produto of this.constantesService.PRODUTOS) {
      if (produtosDoRelatorio.has(produto.nome)) {
        produtosOrdenados.push(produtosDoRelatorio.get(produto.nome)!);
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

  /**
   * Agrupa os produtos filtrados por categoria para exibição no template.
   */
  public get produtosPorCategoria(): { [key in Categoria]: ProdutoComPreco[] } {
    return this.produtosFiltrados.reduce((acc, produto) => {
      const produtoConstante = this.constantesService.PRODUTOS.find(
        (p) => p.nome === produto.nome
      );
      const categoria = produtoConstante
        ? produtoConstante.categoria
        : Categoria.ProdutosProcessadosEEmbalados;
      acc[categoria] = acc[categoria] || [];
      acc[categoria].push(produto);
      return acc;
    }, {} as { [key in Categoria]: ProdutoComPreco[] });
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
