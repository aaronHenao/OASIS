import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {
  private apiUrl = 'http://localhost:8080/api/escenarios';

  constructor(private http: HttpClient) {}

  getEscenarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
