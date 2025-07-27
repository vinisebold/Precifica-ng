import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConstantesService } from '../../services/constantes';
import { ArmazenamentoService } from '../../services/armazenamento';
import { DadosLista } from '../../models/dados-lista';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-precos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-precos.html',
  styleUrl: './formulario-precos.css',
})
export class FormularioPrecos implements OnInit {
  @Output() relatorioGerado = new EventEmitter<{
    titulo: string;
    precos: { [key: string]: number };
  }>();
  @Output() categoriasSelecionadasChange = new EventEmitter<{ [categoria: string]: boolean }>();

  public tituloRelatorio: string = '';
  public precos: { [nomeProduto: string]: number } = {};
  public categoriasSelecionadas: { [categoria: string]: boolean } = {};
  public mobileTagState: { [categoria: string]: boolean } = {};
  public showCleanSection: boolean = false;
  public isHidingCleanSection: boolean = false;

  private salvarDados$ = new Subject<void>();

  constructor(
    public constantes: ConstantesService,
    private armazenamento: ArmazenamentoService
  ) {}

  ngOnInit(): void {
    // Inicializa todas as categorias como selecionadas
    const cache = this.armazenamento.carregarCategoriasSelecionadas();
    for (const grupo of this.constantes.PRODUTOS_CATEGORIZADOS) {
      this.categoriasSelecionadas[grupo.categoria] = cache && cache[grupo.categoria] !== undefined ? cache[grupo.categoria] : true;
      this.mobileTagState[grupo.categoria] = false;
    }
    this.carregarDadosSalvos();
    this.configurarAutoSave();
    this.updateCleanSectionVisibility();
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

  public onCategoriaSelecionadaChange(): void {
    this.armazenamento.salvarCategoriasSelecionadas(this.categoriasSelecionadas);
    this.categoriasSelecionadasChange.emit(this.categoriasSelecionadas);
    this.updateCleanSectionVisibility();
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
      this.categoriasSelecionadasChange.emit(this.categoriasSelecionadas);
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
    }
  }

  // Métodos para a funcionalidade da label clean
  public getCategoriasDeselected(): string[] {
    return Object.keys(this.categoriasSelecionadas).filter(
      categoria => !this.categoriasSelecionadas[categoria]
    );
  }

  public onCategoriaHover(categoria: string, isHovering: boolean): void {
    // Lógica para hover em desktop (não afeta mobile)
    if (!this.isMobile()) {
      // O hover é controlado puramente por CSS
    }
  }

  public onCategoriaTagClick(categoria: string): void {
    if (this.isMobile()) {
      // Em mobile, alterna o estado da tag (mostrar/esconder X)
      this.mobileTagState[categoria] = !this.mobileTagState[categoria];
      
      // Esconde outros Xs abertos
      Object.keys(this.mobileTagState).forEach(key => {
        if (key !== categoria) {
          this.mobileTagState[key] = false;
        }
      });
    }
  }

  public reativarCategoria(categoria: string): void {
    this.categoriasSelecionadas[categoria] = true;
    this.mobileTagState[categoria] = false;
    this.onCategoriaSelecionadaChange();
  }

  private updateCleanSectionVisibility(): void {
    const hasDeselectedCategories = this.getCategoriasDeselected().length > 0;
    
    if (hasDeselectedCategories && !this.showCleanSection) {
      // Mostrar seção com animação suave
      this.showCleanSection = true;
      this.isHidingCleanSection = false;
      
      // Pequeno delay para garantir que o DOM seja atualizado antes da animação
      setTimeout(() => {
        this.isHidingCleanSection = false;
      }, 10);
      
    } else if (!hasDeselectedCategories && this.showCleanSection) {
      // Iniciar animação de saída
      this.isHidingCleanSection = true;
      
      // Aguardar a animação terminar antes de remover do DOM
      setTimeout(() => {
        this.showCleanSection = false;
        this.isHidingCleanSection = false;
      }, 400); // Deve coincidir com a duração da transição CSS (0.4s)
    }
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }
}