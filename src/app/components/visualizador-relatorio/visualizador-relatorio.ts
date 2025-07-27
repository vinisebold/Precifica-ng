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
  @Input() categoriasSelecionadas?: { [categoria: string]: boolean };
  @Output() voltarClicado = new EventEmitter<void>();

  public compartilhando: boolean = false;
  public mostrarSelecaoCompartilhamento: boolean = false;

  constructor(
    public relatorioService: RelatorioService,
    private compartilhamentoService: CompartilhamentoService
  ) {}

  ngOnInit(): void {
    // Remover propriedades e métodos relacionados a estatísticas
  }

  get produtosFiltrados() {
    if (!this.categoriasSelecionadas) return this.relatorio.produtos;
    // Lista de categorias e produtos igual ao ConstantesService
    const grupos = [
      { categoria: 'Cebolas', produtos: [
        'Cebola CX 3', 'Cebola CX 2', 'Cebola VC 1', 'Cebola fraca', 'Cebola roxa',
      ] },
      { categoria: 'Batatas', produtos: [
        'Batata lavada', 'Batata escovada', 'Batata média', 'Batata para rechear', 'Batata roxa', 'Batata para fritura', 'Batata palha', 'Batata chips',
      ] },
      { categoria: 'Alho', produtos: ['Alho CX 10kg'] },
      { categoria: 'Ovos', produtos: ['Ovos embalados', 'Ovos bandeja'] },
      { categoria: 'Feijões', produtos: ['Feijão preto', 'Feijão vermelho'] },
      { categoria: 'Raízes e Tubérculos', produtos: [
        'Cenoura boa', 'Cenoura G', 'Beterraba G', 'Beterraba boa', 'Beterraba miúda', 'Batata-doce G', 'Batata-doce boa', 'Batata-doce P', 'Gengibre',
      ] },
      { categoria: 'Abóboras', produtos: ['Abóbora seca', 'Abóbora verde'] },
      { categoria: 'Tomates', produtos: ['Tomate G', 'Tomate médio', 'Tomate Saladette', 'Tomate cereja'] },
      { categoria: 'Outros Vegetais', produtos: ['Pepino', 'Pepino japonês', 'Vagem', 'Chuchu'] },
      { categoria: 'Folhas Verdes e Ervas', produtos: [
        'Alface crespa', 'Alface americana', 'Rúcula', 'Agrião', 'Cebolinha', 'Salsa',
      ] },
      { categoria: 'Repolhos e Similares', produtos: [
        'Repolho verde', 'Repolho roxo', 'Couve-flor', 'Brócolis',
      ] },
      { categoria: 'Frutas', produtos: [
        'Manga', 'Limão', 'Laranja', 'Melão', 'Abacaxi',
      ] },
    ];
    // Cria um mapa de produtos do relatório
    const produtosRelatorio = new Map(this.relatorio.produtos.map(p => [p.nome, p]));
    // Monta a lista ordenada e filtrada
    const produtosOrdenados: any[] = [];
    for (const grupo of grupos) {
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
      await this.compartilhamentoService.compartilharRelatorioComoTexto(this.relatorio);
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

  public voltar(): void {
    this.voltarClicado.emit();
  }
}
