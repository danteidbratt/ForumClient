import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, AuthUser } from '../misc/models';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../misc/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginTrigger: Subject<any> = new Subject<any>()
  user: BehaviorSubject<AuthUser> = new BehaviorSubject(null)
  credentials: string
  baseUrl: String = AppSettings.API_BASE_URL

  constructor(private client: HttpClient) {
    let authUserCookie = localStorage.getItem('authUser')
    this.user.next(JSON.parse(authUserCookie))
    let credentialsCookie = localStorage.getItem('credentials')
    this.credentials = credentialsCookie
  }

  public login(username: string, password: string): Observable<User> {
    this.resetCredentials()
    this.credentials = 'Basic ' + btoa(`${username}:${password}`)
    localStorage.setItem('credentials', this.credentials)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.credentials)
    let url = this.baseUrl + '/users/me'

    return this.client.get<User>(url, { headers })
      .pipe(
        catchError(err => {
          this.resetCredentials()
          return throwError(err)
        })
      )
  }

  public logOut() {
    this.resetCredentials()
  }

  public setUser(user: User) {
    this.user.next({
      uuid: user.uuid,
      name: user.name
    })
    localStorage.setItem('authUser', JSON.stringify(user))
  }

  demandLogin(): boolean {
    if (!this.user.value) {
      this.loginTrigger.next('trigger')
      return false
    }
    return true
  }

  private resetCredentials() {
    this.credentials = null
    this.user.next(null)
    localStorage.removeItem('authUser')
    localStorage.removeItem('credentials')
  }
}
