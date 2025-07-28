import { Injectable } from '@angular/core';
import { DadosLista } from '../models/dados-lista';
import { ConstantesService } from './constantes';
import { CategoriaConfig } from '../components/configuracoes-categorias/configuracoes-categorias'; // Importar a interface
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArmazenamentoService {
  private _configuracoesCategoriasAtualizadas = new Subject<void>();
  public configuracoesCategoriasAtualizadas$ = this._configuracoesCategoriasAtualizadas.asObservable();

  constructor(private constantes: ConstantesService) {}

  /**
   * Salva dados no localStorage
   */
  public salvar(dados: DadosLista): boolean {
    try {
      const dadosParaSalvar: DadosLista = {
        ...dados,
        ultimaAtualizacao: new Date().toISOString(),
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

      if (
        !parsed ||
        typeof parsed !== 'object' ||
        typeof parsed.titulo !== 'string' ||
        typeof parsed.precos !== 'object' ||
        parsed.precos === null
      ) {
        console.warn(
          'Dados inválidos no localStorage. A estrutura não corresponde ao esperado.'
        );
        this.limpar();
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
      console.log('ArmazenamentoService: localStorage LIMPO para CHAVE_ARMAZENAMENTO.');
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
   * Salva as configurações de categorias no localStorage
   */
  public salvarConfiguracoesCategorias(configs: CategoriaConfig[]): boolean {
    try {
      localStorage.setItem(
        this.constantes.CHAVE_CONFIGURACOES_CATEGORIAS,
        JSON.stringify(configs)
      );
      console.log('ArmazenamentoService: Configurações de categorias salvas:', configs);
      this._configuracoesCategoriasAtualizadas.next(); // Notifica os inscritos sobre a atualização
      return true;
    } catch (erro) {
      console.error('Erro ao salvar configurações de categorias no localStorage:', erro);
      return false;
    }
  }

  /**
   * Carrega as configurações de categorias do localStorage
   */
  public carregarConfiguracoesCategorias(): CategoriaConfig[] | null {
    try {
      const dados = localStorage.getItem(this.constantes.CHAVE_CONFIGURACOES_CATEGORIAS);
      console.log('ArmazenamentoService: Dados brutos carregados do localStorage para configurações de categorias:', dados);
      if (!dados) {
        console.log('ArmazenamentoService: Nenhuma configuração de categoria encontrada no localStorage.');
        return null;
      }

      const parsed = JSON.parse(dados);

      // Validação básica para garantir que o formato é um array de objetos com 'nome' e 'visivel'
      if (!Array.isArray(parsed) || !parsed.every(item => typeof item === 'object' && item !== null && 'nome' in item && 'visivel' in item)) {
        console.warn('ArmazenamentoService: Dados de configuração de categorias inválidos no localStorage. Tipo inesperado ou estrutura incorreta.');
        console.warn('ArmazenamentoService: Dados parseados (inválido):', parsed); // Adicionado log para dados inválidos
        // Opcional: limpar dados inválidos
        // localStorage.removeItem(this.constantes.CHAVE_CONFIGURACOES_CATEGORIAS);
        return null;
      }

      console.log('ArmazenamentoService: Configurações de categorias parseadas:', parsed);
      return parsed as CategoriaConfig[];
    } catch (erro) {
      console.error('ArmazenamentoService: Erro ao carregar configurações de categorias do localStorage:', erro);
      return null;
    }
  }
}
