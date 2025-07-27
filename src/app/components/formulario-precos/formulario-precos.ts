import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConstantesService } from '../../services/constantes';
import { ArmazenamentoService } from '../../services/armazenamento';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-precos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-precos.html',
  styleUrl: './formulario-precos.css',
})
export class FormularioPrecos implements OnInit {
  @Output() relatorioGerado = new EventEmitter<{
    titulo: string;
    precos: { [key: string]: number };
  }>();

  public tituloRelatorio: string = '';
  public precos: { [nomeProduto: string]: number } = {};

  private salvarDados$ = new Subject<void>();

  constructor(
    public constantes: ConstantesService,
    private armazenamento: ArmazenamentoService
  ) {}

  ngOnInit(): void {
    this.carregarDadosSalvos();
    this.configurarAutoSave();
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
    }
  }
}
