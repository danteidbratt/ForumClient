import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, AuthUser } from '../misc/models';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../misc/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: BehaviorSubject<AuthUser> = new BehaviorSubject(null)
  credentials: string
  baseUrl: String = AppSettings.API_BASE_URL

  constructor(private client: HttpClient, private cookies: CookieService) {
    let authUserCookie = this.cookies.get('authUser')
    if (authUserCookie.length > 0) {
      this.authUser.next(JSON.parse(authUserCookie))
    }
    let credentialsCookie = this.cookies.get('credentials')
    this.credentials = credentialsCookie.length > 0 ? credentialsCookie : null
  }

  public login(username: string, password: string): Observable<User> {
    this.resetCredentials()
    this.credentials = 'Basic ' + btoa(`${username}:${password}`)
    this.cookies.set('credentials', this.credentials)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.credentials)
    let url = this.baseUrl + '/users/login'

    return this.client.get<User>(url, { headers })
      .pipe(
        catchError(err => {
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
    this.cookies.set('authUser', JSON.stringify(user))
    this.cookies.set('username', user.name)
    this.cookies.set('userUuid', user.uuid)
  }

  private resetCredentials() {
    this.credentials = null
    this.authUser.next(null)
    this.cookies.delete('username')
    this.cookies.delete('userUuid')
    this.cookies.delete('credentials')
  }
}
