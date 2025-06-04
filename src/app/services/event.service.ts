import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8084/api/v1'; // à adapter si ton back a un autre port

  constructor(private http: HttpClient) {}

  createEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(`${this.baseUrl}/event`, evenement);
  }

  getAllEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.baseUrl}/events`);
  }

  getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.baseUrl}/event/${id}`);
  }

  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.baseUrl}/event/${id}`, evenement);
  }

  deleteEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEvenementsByType(type: string): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.baseUrl}/type/${type}`);
  }



}
