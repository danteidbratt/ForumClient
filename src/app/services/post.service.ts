import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../misc/models';
import { AppSettings } from '../misc/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = AppSettings.API_BASE_URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getAllPosts(): Observable<Post[]> {
    if (this.authService.credentials) {
      return this.getAllPostsAsUser()
    } else {
      return this.getAllPostsAsGuest()
    }
  }

  private getAllPostsAsUser() {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authService.credentials)
    let url = this.baseUrl + '/posts'
    return this.http.get<Post[]>(url, { headers })
  }

  private getAllPostsAsGuest(): Observable<Post[]> {
    let headers = new HttpHeaders().set('Accept', 'application/json')
    let url = this.baseUrl + '/posts/guest'
    return this.http.get<Post[]>(url, { headers })
  }

  public getPost(postUuid: string): Observable<Post> {
    if (this.authService.credentials) {
      return this.getPostAsUser(postUuid)
    } else {
      return this.getPostAsGuest(postUuid)
    }
  }

  private getPostAsGuest(postUuid: string): Observable<Post> {
    let headers = new HttpHeaders().set('Accept', 'application/json')
    let url = `${this.baseUrl}/posts/${postUuid}/guest`
    return this.http.get<Post>(url, { headers })
  }

  private getPostAsUser(postUuid: string): Observable<Post> {
    let headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', this.authService.credentials)
    let url = `${this.baseUrl}/posts/${postUuid}`
    return this.http.get<Post>(url, { headers })
  }

  public voteOnPost(postUuid: string, direction: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authService.credentials)
    let url = this.baseUrl + '/posts/' + postUuid + '/vote'
    let body = { direction }
    return this.http.post(url, body, { headers })
  }

  public deleteVoteOnPost(postUuid: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.authService.credentials)
    let url = this.baseUrl + '/posts/' + postUuid + '/vote'
    return this.http.delete(url, { headers })
  }

}
