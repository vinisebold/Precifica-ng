import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ConstantesService,
  Categoria,
  Produto,
} from '../../services/constantes';
import { ArmazenamentoService } from '../../services/armazenamento';
import { CategoriaConfig } from '../configuracoes-categorias/configuracoes-categorias'; // Importar a interface
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-precos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-precos.html',
  styleUrl: './formulario-precos.css',
})
export class FormularioPrecos implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef>;
  @Output() relatorioGerado = new EventEmitter<{
    titulo: string;
    precos: { [key: string]: number };
  }>();

  public tituloRelatorio: string = '';
  public precos: { [nomeProduto: string]: number } = {};
  public categoriaSelecionada: Categoria | null = null;
  public categoriasExibicao: Categoria[] = []; // Nova propriedade para armazenar categorias a serem exibidas

  private salvarDados$ = new Subject<void>();
  private configuracoesCategoriasSubscription!: Subscription;

  constructor(
    public constantes: ConstantesService,
    private armazenamento: ArmazenamentoService
  ) {}

  ngOnInit(): void {
    this.carregarDadosSalvos();
    console.log('FormularioPrecos: ngOnInit - Carregando configurações de categorias...');
    this.carregarConfiguracoesCategorias(); // Carrega as configurações de categoria
    console.log('FormularioPrecos: Categorias exibidas após ngOnInit:', this.categoriasExibicao);
    this.configurarAutoSave();
    // Garante que a categoria selecionada seja uma das categorias de exibição
    // Isso é importante para o caso de uma categoria previamente selecionada ter sido ocultada
    if (this.categoriaSelecionada && !this.categoriasExibicao.includes(this.categoriaSelecionada)) {
      this.categoriaSelecionada = this.categoriasExibicao[0] || null;
    } else if (!this.categoriaSelecionada && this.categoriasExibicao.length > 0) {
      this.categoriaSelecionada = this.categoriasExibicao[0];
    }

    this.configuracoesCategoriasSubscription = this.armazenamento.configuracoesCategoriasAtualizadas$.subscribe(() => {
      console.log('FormularioPrecos: configuracoesCategoriasAtualizadas$ - Recarregando configurações de categorias...');
      this.carregarConfiguracoesCategorias();
      console.log('FormularioPrecos: Categorias exibidas após atualização:', this.categoriasExibicao);
      // Após a atualização, verifica se a categoria selecionada ainda é visível.
      // Se não for, ou se não houver categoria selecionada, seleciona a primeira visível.
      if (this.categoriaSelecionada && !this.categoriasExibicao.includes(this.categoriaSelecionada)) {
        this.categoriaSelecionada = this.categoriasExibicao[0] || null;
      } else if (!this.categoriaSelecionada && this.categoriasExibicao.length > 0) {
        this.categoriaSelecionada = this.categoriasExibicao[0];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.configuracoesCategoriasSubscription) {
      this.configuracoesCategoriasSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // Garantir que a tab selecionada inicialmente receba foco
    this.focarTabSelecionada();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    const tabs = this.tabButtons.toArray();
    const activeElement = document.activeElement;
    const currentTabIndex = tabs.findIndex(tab => tab.nativeElement === activeElement);

    if (currentTabIndex === -1) {
      // Se o foco não está em uma tab, não faz nada
      return;
    }

    let nextTabIndex = currentTabIndex;

    switch (event.key) {
      case 'ArrowRight':
        nextTabIndex = (currentTabIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Enter':
      case ' ': // Spacebar
        // Prevenir o comportamento padrão para não rolar a página com a barra de espaço
        event.preventDefault();
        this.selecionarCategoria(this.categoriasExibicao[currentTabIndex]); // Usa categoriasExibicao
        break;
      default:
        return; // Não é uma tecla de navegação de tab
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); // Prevenir rolagem da página
      tabs[nextTabIndex].nativeElement.focus();
      this.selecionarCategoria(this.categoriasExibicao[nextTabIndex]); // Usa categoriasExibicao
    }
  }

  private focarTabSelecionada(): void {
    // Esperar um pouco para garantir que os elementos estejam renderizados
    setTimeout(() => {
      const selectedCategoryIndex = this.categoriasExibicao.indexOf(this.categoriaSelecionada!); // Usa categoriasExibicao
      if (selectedCategoryIndex !== -1 && this.tabButtons && this.tabButtons.length > 0) {
        this.tabButtons.toArray()[selectedCategoryIndex].nativeElement.focus();
      }
    });
  }

  public get produtosPorCategoria(): { [key in Categoria]: Produto[] } {
    return this.constantes.PRODUTOS.reduce((acc, produto) => {
      acc[produto.categoria] = acc[produto.categoria] || [];
      acc[produto.categoria].push(produto);
      return acc;
    }, {} as { [key in Categoria]: Produto[] });
  }

  public gerarIdCategoria(categoria: Categoria): string {
    return categoria
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  public selecionarCategoria(categoria: Categoria): void {
    this.categoriaSelecionada = categoria;
  }

  private carregarConfiguracoesCategorias(): void {
    const configsSalvas = this.armazenamento.carregarConfiguracoesCategorias();
    if (configsSalvas && configsSalvas.length > 0) {
      this.categoriasExibicao = configsSalvas
        .filter((config) => config.visivel)
        .map((config) => config.nome);
      console.log('FormularioPrecos: Categorias carregadas do ArmazenamentoService (filtradas):', this.categoriasExibicao);
    } else {
      this.categoriasExibicao = [...this.constantes.CATEGORIAS];
      console.log('FormularioPrecos: Nenhuma configuração salva. Usando categorias padrão:', this.categoriasExibicao);
    }
  }

  private configurarAutoSave(): void {
    this.salvarDados$.pipe(debounceTime(1000)).subscribe(() => {
      this.armazenamento.salvar({
        titulo: this.tituloRelatorio,
        precos: this.precos,
      });
    });
  }

  private carregarDadosSalvos(): void {
    const dadosSalvos = this.armazenamento.carregar();
    if (dadosSalvos) {
      this.tituloRelatorio = dadosSalvos.titulo || '';
      this.precos = dadosSalvos.precos || {};
    }
  }

  public onTituloChange(): void {
    this.salvarDados$.next();
  }

  public onPrecoChange(): void {
    this.salvarDados$.next();
  }

  public temPrecosPreenchidos(): boolean {
    return Object.values(this.precos).some((preco) => preco && preco > 0);
  }

  public gerarRelatorio(): void {
    if (this.temPrecosPreenchidos()) {
      this.armazenamento.salvar({
        titulo: this.tituloRelatorio,
        precos: this.precos,
      });
      this.relatorioGerado.emit({
        titulo: this.tituloRelatorio,
        precos: this.precos,
      });
    }
  }

  public limparTudo(): void {
    if (confirm('Tem certeza que deseja limpar todos os campos?')) {
      this.tituloRelatorio = '';
      this.precos = {};
      this.armazenamento.limpar();
      this.carregarConfiguracoesCategorias(); // Recarrega as configurações para resetar
      this.categoriaSelecionada = this.categoriasExibicao[0] || null; // Reseta para a primeira categoria visível
    }
  }
}
