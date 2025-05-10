import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escenario } from '../models/escenario.model';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {
  private apiUrl = 'http://localhost:8080/escenarios'; 

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Escenario[]> {
    return this.http.get<Escenario[]>(this.apiUrl);

  }
}