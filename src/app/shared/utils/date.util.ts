// src/app/shared/utils/date.util.ts

/**
 * Utilitário para formatação de datas
 */
export class DateUtil {
  /**
   * Formata uma data para o padrão DD/MM/YYYY - HH:mm
   * @param data - String da data em formato ISO ou Date object
   * @returns String formatada da data
   */
  static formatarData(data: string | Date): string {
    const dataObj = new Date(data);
    
    if (isNaN(dataObj.getTime())) {
      return 'Data inválida';
    }
    
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }
}