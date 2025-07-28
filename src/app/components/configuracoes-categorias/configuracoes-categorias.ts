import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantesService, Categoria } from '../../services/constantes';
import { ArmazenamentoService } from '../../services/armazenamento';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

export interface CategoriaConfig {
  nome: Categoria;
  visivel: boolean;
}

@Component({
  selector: 'app-configuracoes-categorias',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './configuracoes-categorias.html',
  styleUrl: './configuracoes-categorias.css',
})
export class ConfiguracoesCategoriasComponent implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();

  public categoriasConfig: CategoriaConfig[] = [];

  constructor(
    private constantesService: ConstantesService,
    private armazenamentoService: ArmazenamentoService
  ) {}

  ngOnInit(): void {
    this.carregarConfiguracoes();
  }

  private carregarConfiguracoes(): void {
    const configsSalvas = this.armazenamentoService.carregarConfiguracoesCategorias();
    if (configsSalvas && configsSalvas.length > 0) {
      this.categoriasConfig = configsSalvas;
    } else {
      // Se não houver configurações salvas, inicializa com a ordem padrão e todas visíveis
      const categoriasPadrao: CategoriaConfig[] = this.constantesService.CATEGORIAS.map(
        (categoria) => ({ nome: categoria, visivel: true })
      );
      this.categoriasConfig = categoriasPadrao;
      // Salva as configurações padrão para garantir que o localStorage não fique vazio
      this.armazenamentoService.salvarConfiguracoesCategorias(categoriasPadrao);
    }
  }

  public onFecharModal(): void {
    this.fecharModal.emit();
  }

  public onSalvarConfiguracoes(): void {
    this.armazenamentoService.salvarConfiguracoesCategorias(this.categoriasConfig);
    this.fecharModal.emit();
  }

  public drop(event: CdkDragDrop<CategoriaConfig[]>): void {
    moveItemInArray(this.categoriasConfig, event.previousIndex, event.currentIndex);
  }

  public toggleVisibilidade(categoria: CategoriaConfig): void {
    categoria.visivel = !categoria.visivel;
    this.onSalvarConfiguracoes(); // Salva as configurações imediatamente após a alteração
  }
}