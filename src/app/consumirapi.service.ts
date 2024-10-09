import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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

    const apiUrl = `/api/${tribunalAlias}/_search`;

    return this.http.post<any>(apiUrl, body, { headers: headers });
  }
}
