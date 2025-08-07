// src/app/shared/constants.ts

export const TRIBUNAIS = [
  { nome: 'Tribunal de Justiça de São Paulo (TJSP)', alias: 'api_publica_tjsp' },
  { nome: 'Tribunal Superior do Trabalho', alias: 'api_publica_tst' },
  { nome: 'Tribunal Superior Eleitoral', alias: 'api_publica_tse' },
  { nome: 'Tribunal Superior de Justiça', alias: 'api_publica_stj' },
  { nome: 'Tribunal Superior Militar', alias: 'api_publica_stm' },
  { nome: 'Tribunal Regional Federal da 2ª Região - Grande São Paulo', alias: 'api_publica_trf2' },
  { nome: 'Tribunal de Justiça de Minas Gerais', alias: 'api_publica_tjmg' },
  { nome: 'Tribunal Regional do Trabalho da 2ª Região', alias: 'api_publica_trt2' },
  { nome: 'Tribunal Regional Eleitoral de São Paulo', alias: 'api_publica_tre-sp' },
  { nome: 'Tribunal Justiça Militar de São Paulo', alias: 'api_publica_tjmsp' },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  ITEMS_PER_PAGE: 10,
} as const;

export const MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELDS: 'Por favor, preencha o número do processo e selecione um tribunal.',
    NO_PROCESS_FOUND: 'Não há informações sobre o processo ou houve um erro na consulta.',
  },
  ERROR: {
    FETCH_PROCESS: 'Erro ao buscar o processo:',
    COMPONENT_ERROR: 'Componente recebeu erro:',
  },
} as const;

export const DATE_FORMAT = {
  DISPLAY_FORMAT: 'DD/MM/YYYY - HH:mm',
} as const;