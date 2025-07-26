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
      return dados ? JSON.parse(dados) : null;
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
}