import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url="http://localhost:8084/api/v1";


  constructor(private http:HttpClient) { }
 public saveEvent(event:Event):Observable<Event>{
  return this.http.post<Event>(`${this.url}/event`,event);//INSER EVENT DANS UN VARIABLE URL:interpolation
 }
 public getAll():Observable<Event[]>{
  return this.http.get<Event[]>(`${this.url}/events`);
 }
 public delete(id:number):Observable<Event>{
  return this.http.delete<Event>(`${this.url}/${id}`)
 }
 public update(event:Event,id:number):Observable<Event>{
  return this.http.put<Event>(`${this.url}/${id}`,event);
 }


}
