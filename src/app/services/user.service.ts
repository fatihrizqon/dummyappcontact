import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURI: String = 'https://632be8915568d3cad8779d9a.mockapi.io/api';
  constructor(private http: HttpClient) {}

  public all(): Observable<any> {
    return this.http.get<any>(this.baseURI + '/users', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public store(user: any): Observable<any> {
    return this.http.post<any>(this.baseURI + '/users', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public find(id: number): Observable<any> {
    return this.http.get<any>(this.baseURI + '/users/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public update(id: number, user: any): Observable<any> {
    return this.http.put<any>(this.baseURI + '/users/' + id, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
