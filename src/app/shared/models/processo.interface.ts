// src/app/shared/models/processo.interface.ts

export interface Tribunal {
  nome: string;
  alias: string;
}

export interface Classe {
  codigo: number;
  nome: string;
}

export interface Sistema {
  codigo: number;
  nome: string;
}

export interface OrgaoJulgador {
  codigo: number;
  nome: string;
}

export interface ComplementoTabelado {
  codigo: number;
  nome: string;
  valor?: string;
}

export interface Movimento {
  codigo: number;
  nome: string;
  dataHora: string;
  complementosTabelados: ComplementoTabelado[];
}

export interface ProcessoSource {
  numeroProcesso: string;
  classe: Classe;
  sistema: Sistema;
  orgaoJulgador: OrgaoJulgador;
  dataAjuizamento: string;
  dataHoraUltimaAtualizacao: string;
  tribunal: string;
  grau: string;
  movimentos: Movimento[];
}

export interface Processo {
  _id: string;
  _source: ProcessoSource;
  totalMovimentos: number;
}
