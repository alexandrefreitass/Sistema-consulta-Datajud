// src/app/shared/services/validation.service.ts
import { Injectable } from '@angular/core';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  /**
   * Valida se os campos obrigatórios estão preenchidos
   * @param numeroProcesso - Número do processo
   * @param tribunalSelecionado - Tribunal selecionado
   * @returns ValidationResult com resultado da validação
   */
  validateConsultaFields(numeroProcesso: string, tribunalSelecionado: string): ValidationResult {
    if (!numeroProcesso?.trim()) {
      return {
        isValid: false,
        message: 'Por favor, preencha o número do processo.'
      };
    }

    if (!tribunalSelecionado?.trim()) {
      return {
        isValid: false,
        message: 'Por favor, selecione um tribunal.'
      };
    }

    // Validação básica de formato de número de processo (pode ser melhorada)
    const numeroProcessoLimpo = numeroProcesso.replace(/\D/g, '');
    if (numeroProcessoLimpo.length < 15) {
      return {
        isValid: false,
        message: 'Número do processo deve ter pelo menos 15 dígitos.'
      };
    }

    return { isValid: true };
  }

  /**
   * Formata número do processo removendo caracteres especiais
   * @param numeroProcesso - Número do processo
   * @returns Número do processo formatado
   */
  formatNumeroProcesso(numeroProcesso: string): string {
    return numeroProcesso.replace(/\D/g, '');
  }
}