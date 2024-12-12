import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './Model/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8089'; // URL de votre API

  constructor(private http: HttpClient) { }

    // Récupérer tous les UserProfiles
    getAllUserProfiles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/user-profiles`);
    }
    getProjectById(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/projects/${id}`);
    }
    getUserProfileById(id: number): Observable<UserProfile> {
      return this.http.get<UserProfile>(`${this.baseUrl}/user-profiles/${id}`);
  }
  getProjectByIdUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/user/${id}`);
  }
}
