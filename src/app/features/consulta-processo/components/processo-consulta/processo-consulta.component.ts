// src/app/features/consulta-processo/components/processo-consulta/processo-consulta.component.ts
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, timeout, finalize } from 'rxjs/operators';

import { DatajudService } from '../../../../core';
import { ValidationService, NotificationService, DateUtil, Processo, TRIBUNAIS, PAGINATION, MESSAGES } from '../../../../shared';

@Component({
    selector: 'app-processo-consulta',
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './processo-consulta.component.html',
    styleUrls: ['./processo-consulta.component.scss']
})
export class ProcessoConsultaComponent implements OnDestroy {
  // Form data
  numeroProcesso: string = '';
  tribunalSelecionado: string = '';
  
  // Results data
  processo: Processo | null = null;
  consultaFeita: boolean = false;
  isLoading: boolean = false;
  consultaEmAndamento: boolean = false;
  
  // Pagination
  page: number = PAGINATION.DEFAULT_PAGE;
  itemsPerPage: number = PAGINATION.ITEMS_PER_PAGE;
  
  // Constants
  readonly tribunais = TRIBUNAIS;
  
  // Destroy subject para gerenciar subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private datajudService: DatajudService,
    private validationService: ValidationService,
    private notificationService: NotificationService
  ) {}

  /**
   * Submete o formulário de consulta
   */
  onSubmit(): void {
    // Previne múltiplas consultas simultâneas
    if (this.consultaEmAndamento) {
      this.notificationService.showWarning('Aguarde o término da consulta atual');
      return;
    }

    const validation = this.validationService.validateConsultaFields(
      this.numeroProcesso, 
      this.tribunalSelecionado
    );

    if (!validation.isValid) {
      this.notificationService.showWarning(validation.message!);
      return;
    }

    this.fetchProcesso();
  }

  /**
   * Busca dados do processo na API
   */
  private fetchProcesso(): void {
    // Limpa estado anterior completamente
    this.limparConsulta();
    this.isLoading = true;
    this.consultaEmAndamento = true;
    
    console.log('🔍 Iniciando consulta...', { numeroProcesso: this.numeroProcesso, tribunal: this.tribunalSelecionado });
    
    const numeroProcessoLimpo = this.validationService.formatNumeroProcesso(this.numeroProcesso);
    
    // Força um pequeno delay para garantir que o estado foi limpo
    setTimeout(() => {
      this.datajudService.getProcesso(numeroProcessoLimpo, this.tribunalSelecionado)
        .pipe(
          timeout(30000), // Timeout de 30 segundos
          takeUntil(this.destroy$), // Cancelar se o componente for destruído
          finalize(() => {
            // Sempre executado, mesmo em caso de erro ou timeout
            this.isLoading = false;
            this.consultaEmAndamento = false;
            console.log('🏁 Consulta finalizada, loading resetado');
          })
        )
        .subscribe({
          next: (processoDetalhado: Processo | null) => {
            console.log('✅ Resposta recebida:', processoDetalhado ? 'Processo encontrado' : 'Nenhum processo');
            this.processo = processoDetalhado;
            this.consultaFeita = true;
            this.page = PAGINATION.DEFAULT_PAGE;
            
            if (processoDetalhado) {
              this.notificationService.showSuccess('Processo encontrado com sucesso!');
            } else {
              this.notificationService.showInfo(MESSAGES.VALIDATION.NO_PROCESS_FOUND);
            }
          },
          error: (error) => {
            console.error('❌ Erro na consulta:', error);
            this.limparConsulta(); // Limpa estado em caso de erro
            this.consultaFeita = true;
            
            if (error.name === 'TimeoutError') {
              this.notificationService.showError('Timeout: A consulta demorou muito para responder. Tente novamente.');
            } else {
              this.notificationService.showError('Erro ao consultar processo. Tente novamente.');
            }
          }
        });
    }, 100); // Delay de 100ms
  }

  /**
   * Formata data usando utilitário centralizado
   */
  formatarData(data: string): string {
    return DateUtil.formatarData(data);
  }

  /**
   * Navega para a próxima página
   */
  proximaPagina(): void {
    if (this.processo && this.page * this.itemsPerPage < this.processo.totalMovimentos) {
      this.page++;
    }
  }

  /**
   * Navega para a página anterior
   */
  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  /**
   * Obtém movimentos para a página atual
   */
  getMovimentosPaginados() {
    if (!this.processo?._source.movimentos) return [];
    
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = this.page * this.itemsPerPage;
    
    return this.processo._source.movimentos.slice(startIndex, endIndex);
  }

  /**
   * Verifica se há próxima página
   */
  hasNextPage(): boolean {
    return this.processo ? this.page * this.itemsPerPage < this.processo.totalMovimentos : false;
  }

  /**
   * Verifica se há página anterior
   */
  hasPreviousPage(): boolean {
    return this.page > 1;
  }

  /**
   * Limpa os dados da consulta anterior
   */
  limparConsulta(): void {
    this.processo = null;
    this.consultaFeita = false;
    this.isLoading = false;
    this.consultaEmAndamento = false;
    this.page = PAGINATION.DEFAULT_PAGE;
  }

  /**
   * Lifecycle hook - cleanup
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('🧹 Componente destruído, subscriptions canceladas');
  }
}
