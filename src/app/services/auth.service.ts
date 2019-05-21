import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, AuthUser } from '../misc/models';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../misc/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: BehaviorSubject<AuthUser> = new BehaviorSubject(null)
  credentials: string
  baseUrl: String = AppSettings.API_BASE_URL

  constructor(private client: HttpClient) {
    let authUserCookie = localStorage.getItem('authUser')
    this.authUser.next(JSON.parse(authUserCookie))
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
    this.authUser.next({
      uuid: user.uuid,
      name: user.name
    })
    localStorage.setItem('authUser', JSON.stringify(user))
  }

  private resetCredentials() {
    this.credentials = null
    this.authUser.next(null)
    localStorage.removeItem('authUser')
    localStorage.removeItem('credentials')
  }
}
