import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppSettings } from '../misc/constants'
import { Observable } from 'rxjs';
import { Forum } from '../misc/models';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private baseUrl: string = AppSettings.API_BASE_URL

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getAllForums(sortType: string): Observable<Forum[]> {
    if (this.auth.credentials) {
      return this.getAllForumsAsUser(sortType)
    } else {
      return this.getAllForumsAsGuest(sortType)
    }
  }

  public getSubscribedForums(sortType: string): Observable<Forum[]> {
    let url = `${this.baseUrl}/forums/subscriptions`
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    return this.http.get<Forum[]>(url, { headers, params })
  }

  public subscribeToForum(forumUuid: string): Observable<any> {
    let url = `${this.baseUrl}/forums/${forumUuid}/subscriptions`
    let body = {}
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    return this.http.post(url, body, { headers })
  }

  public unsubscribeToForum(forumUuid: string) {
    let url = `${this.baseUrl}/forums/${forumUuid}/subscriptions`
    let body = {}
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    return this.http.delete(url, { headers })
  }

  private getAllForumsAsUser(sortType: string): Observable<Forum[]> {
    let url = `${this.baseUrl}/forums`
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    return this.http.get<Forum[]>(url, { headers, params })
  }

  private getAllForumsAsGuest(sortType: string): Observable<Forum[]> {
    let url = `${this.baseUrl}/forums/guest`
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    return this.http.get<Forum[]>(url, { headers, params })
  }

}
