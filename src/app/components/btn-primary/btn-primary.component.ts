import { Component, Input } from '@angular/core';
import { DatajudService } from '../../consumirapi.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'btn-primary',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.scss']
})
export class BtnPrimaryComponent {
  @Input() btnText: string = "Consuma a API";
  
  numeroProcesso: string = '';
  tribunalSelecionado: string = '';
  processo: any | null = null;
  processoId: string | null = null;
  consultaFeita: boolean = false;

  page: number = 1;
  itemsPerPage: number = 10;
  totalMovimentos: number = 0;

  tribunais = [
    { nome: 'Tribunal de Justiça de São Paulo (TJSP)', alias: 'api_publica_tjsp' },
    { nome: 'Tribunal Superior do Trabalho', alias: 'api_publica_tst' },
    { nome: 'Tribunal Superior Eleitoral', alias: 'api_publica_tse' },
    { nome: 'Tribunal Superior de Justiça', alias: 'api_publica_stj' },
    { nome: 'Tribunal Superior Militar', alias: 'api_publica_stm' },
    { nome: 'Tribunal Regional Federal da 2ª Região	Grande São Paulo', alias: 'api_publica_trf2' },
    { nome: 'Tribunal de Justiça de Minas Gerais', alias: 'api_publica_tjmg' },
    { nome: 'Tribunal Regional do Trabalho da 2ª Região', alias: 'api_publica_trt2' },
    { nome: 'Tribunal Regional Eleitoral de São Paulo', alias: 'api_publica_tre-sp' },
    { nome: 'Tribunal Justiça Militar de São Paulo', alias: 'api_publica_tjmsp' },
    
  ];

  constructor(private datajudService: DatajudService) {}

  submit() {
    this.fetchProcesso();
  }

  fetchProcesso() {
    if (!this.numeroProcesso) {
      alert('Por favor, digite o número do processo.');
      return;
    }

    if (!this.tribunalSelecionado) {
      alert('Por favor, selecione um tribunal.');
      return;
    }
    
    this.datajudService.getProcesso(this.numeroProcesso, this.tribunalSelecionado).subscribe({
      next: (data) => {

        this.processo = data;
        console.log(this.processo);
        if (data.hits && data.hits.hits.length > 0) {
          const processoData = data.hits.hits[0];  // Obtém o primeiro hit
          this.processo = processoData._source;     // Obtém os dados do processo
          this.processoId = processoData._id;       // Armazena o ID do processo
          this.totalMovimentos = this.processo.movimentos.length; // Total de movimentos
        } else {
          this.processo = null;
        }
        this.consultaFeita = true;
      },
      error: (error) => {
        console.error('Erro ao buscar o processo:', error);
        this.processo = null;
        this.consultaFeita = true;
      }
    });
  }

  formatarData(data: string) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }

    // Função para obter os movimentos da página atual
  getMovimentosPaginados(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.processo.movimentos.slice(startIndex, endIndex);
  }

  // Navegar para a próxima página
  proximaPagina() {
    if (this.page * this.itemsPerPage < this.totalMovimentos) {
      this.page++;
    }
  }

  // Navegar para a página anterior
  paginaAnterior() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
