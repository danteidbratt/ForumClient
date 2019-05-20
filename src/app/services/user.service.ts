import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../misc/constants';
import { Observable } from 'rxjs';
import { User } from '../misc/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = AppSettings.API_BASE_URL

  constructor(private http: HttpClient) { }

  public createUser(username: string, password: string): Observable<User> {
    let url = `${this.baseUrl}/users`
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    let body = {
      username: username,
      password: password
    }
    return this.http.post<User>(url, body, { headers })
  }

  public getUser(userUuid: string): Observable<User> {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/users/${userUuid}`
    return this.http.get<User>(url, { headers })
  }
}
