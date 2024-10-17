import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatajudService {
  private apiKey = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=='; // Substitua <API Key> pela sua chave pública
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProcesso(numeroProcesso: string, tribunalAlias: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `ApiKey ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      query: {
        match: {
          numeroProcesso: numeroProcesso
        }
      }
    };

    const apiUrl = `${this.apiUrl}/${tribunalAlias}/_search`;

    // Log da URL e do corpo da requisição
    console.log('Enviando requisição para:', apiUrl);
    console.log('Corpo da requisição:', body);

    return this.http.post<any>(apiUrl, body, { headers: headers }).pipe(
      tap((response) => {
        // Log da resposta da API
        console.log('Resposta da API:', response);
      }),
      catchError((error) => {
        // Log do erro
        console.error('Erro ao buscar o processo:', error);
        return throwError(error);  // Re-emitir o erro para ser tratado posteriormente
      })
    );
  }
}
