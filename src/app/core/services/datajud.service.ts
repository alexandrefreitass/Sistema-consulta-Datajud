// src/app/core/services/datajud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Processo, ProcessoSource } from '../../shared/models/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class DatajudService {

  constructor(private http: HttpClient) {}

  getProcesso(numeroProcesso: string, tribunalAlias: string): Observable<Processo | null> {
    // Headers para evitar cache e garantir requisições "frescas"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const body = {
      numeroProcesso: numeroProcesso, 
      tribunalAlias: tribunalAlias,
      timestamp: Date.now() // Adiciona timestamp para evitar cache
    };

    const apiUrl = `${environment.apiUrl}/api/consulta`; 

    console.log('🌐 DatajudService: Fazendo requisição para:', apiUrl);
    console.log('📋 DatajudService: Dados da requisição:', body);

    return this.http.post<any>(apiUrl, body, { headers: headers }).pipe(
      map(response => {
        console.log('📥 DatajudService: Resposta recebida:', response);
        if (response && response.hits && response.hits.hits.length > 0) {
          const hit = response.hits.hits[0];
          const processo: Processo = {
            _id: hit._id,
            _source: hit._source as ProcessoSource,
            totalMovimentos: hit._source.movimentos?.length || 0
          };
          console.log('✅ DatajudService: Processo mapeado com sucesso');
          return processo;
        }
        console.log('⚠️ DatajudService: Nenhum processo encontrado na resposta');
        return null;
      }),
      catchError((error) => {
        console.error('❌ DatajudService: Erro na requisição:', error);
        console.error('❌ DatajudService: Status:', error.status);
        console.error('❌ DatajudService: Message:', error.message);
        return throwError(() => error); 
      })
    );
  }
}
