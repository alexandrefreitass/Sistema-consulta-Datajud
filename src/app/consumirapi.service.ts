import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatajudService {
  private apiUrl = environment.apiUrl;  // Aponta para o proxy configurado no Netlify

  constructor(private http: HttpClient) {}

  getProcesso(numeroProcesso: string, tribunalAlias: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      numeroProcesso: numeroProcesso,
      tribunalAlias: tribunalAlias
    };

    const apiUrl = `${this.apiUrl}`;

    // Log da URL e do corpo da requisição
    console.log('Enviando requisição para:', apiUrl);
    console.log('Corpo da requisição:', body);

    return this.http.post<any>(apiUrl, body, { headers: headers }).pipe(
      tap((response) => {
        // Verificar se há resultados
        if (response.hits && response.hits.hits.length > 0) {
          const processoData = response.hits.hits[0];  // Primeiro resultado (hit)
          console.log('Dados do processo:', processoData._source);
        } else {
          console.log('Nenhum processo encontrado.');
        }
      }),
      catchError((error) => {
        // Log do erro
        console.error('Erro ao buscar o processo:', error);
        return throwError(error);  // Re-emitir o erro para ser tratado posteriormente
      })
    );
  }
}