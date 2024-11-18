import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatajudService {

  constructor(private http: HttpClient) {}

  getProcesso(numeroProcesso: string, tribunalAlias: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });

    const body = {
      numeroProcesso: numeroProcesso, 
      tribunalAlias: tribunalAlias 
    };

    // URL da função serverless no Netlify
    const apiUrl = `${environment.apiUrl}/.netlify/functions/datajud-proxy`; 

    return this.http.post<any>(apiUrl, body, { headers: headers }).pipe(
      tap((response) => {
        if (response.hits && response.hits.hits.length > 0) {
          const processoData = response.hits.hits[0];
          console.log('Dados do processo:', processoData._source);
        } else {
          console.log('Nenhum processo encontrado.');
        }
      }),
      catchError((error) => {
        console.error('Erro ao buscar o processo:', error);
        return throwError(error); 
      })
    );
  }
}