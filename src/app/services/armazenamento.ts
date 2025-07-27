import { Injectable } from '@angular/core';
import { DadosLista } from '../models/dados-lista';
import { ConstantesService } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoService {

  constructor(private constantes: ConstantesService) {}

  /**
   * Salva dados no localStorage
   */
  public salvar(dados: DadosLista): boolean {
    try {
      const dadosParaSalvar: DadosLista = {
        ...dados,
        ultimaAtualizacao: new Date().toISOString()
      };
      
      localStorage.setItem(
        this.constantes.CHAVE_ARMAZENAMENTO, 
        JSON.stringify(dadosParaSalvar)
      );
      
      return true;
    } catch (erro) {
      console.error('Erro ao salvar no localStorage:', erro);
      return false;
    }
  }

  /**
   * Carrega dados do localStorage
   */
  public carregar(): DadosLista | null {
    try {
      const dados = localStorage.getItem(this.constantes.CHAVE_ARMAZENAMENTO);
      if (!dados) return null;
      
      const parsed = JSON.parse(dados);
      if (!parsed || typeof parsed !== 'object' || !parsed.titulo || !parsed.precos) {
        console.warn('Dados inválidos no localStorage');
        return null;
      }
      return parsed as DadosLista;
    } catch (erro) {
      console.error('Erro ao carregar do localStorage:', erro);
      return null;
    }
  }

  /**
   * Limpa todos os dados armazenados
   */
  public limpar(): boolean {
    try {
      localStorage.removeItem(this.constantes.CHAVE_ARMAZENAMENTO);
      localStorage.removeItem(this.constantes.CHAVE_CATEGORIAS_SELECIONADAS || 'categoriasSelecionadas');
      return true;
    } catch (erro) {
      console.error('Erro ao limpar localStorage:', erro);
      return false;
    }
  }

  /**
   * Verifica se existem dados salvos
   */
  public existemDados(): boolean {
    return localStorage.getItem(this.constantes.CHAVE_ARMAZENAMENTO) !== null;
  }

  /**
   * Salva categorias selecionadas no localStorage
   */
  public salvarCategoriasSelecionadas(categoriasSelecionadas: { [categoria: string]: boolean }): void {
    try {
      localStorage.setItem(
        this.constantes.CHAVE_CATEGORIAS_SELECIONADAS || 'categoriasSelecionadas',
        JSON.stringify(categoriasSelecionadas)
      );
    } catch (erro) {
      console.error('Erro ao salvar categorias selecionadas:', erro);
    }
  }

  /**
   * Carrega categorias selecionadas do localStorage
   */
  public carregarCategoriasSelecionadas(): { [categoria: string]: boolean } | null {
    try {
      const data = localStorage.getItem(this.constantes.CHAVE_CATEGORIAS_SELECIONADAS || 'categoriasSelecionadas');
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      if (!parsed || typeof parsed !== 'object') {
        console.warn('Categorias selecionadas inválidas no localStorage');
        return null;
      }
      return parsed as { [categoria: string]: boolean };
    } catch (erro) {
      console.error('Erro ao carregar categorias selecionadas:', erro);
      return null;
    }
  }
}