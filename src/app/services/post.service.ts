import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../misc/models';
import { AppSettings } from '../misc/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = AppSettings.API_BASE_URL

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getAllPosts(sortType: string): Observable<Post[]> {
    if (this.auth.credentials) {
      return this.getAllPostsAsUser(sortType)
    } else {
      return this.getAllPostsAsGuest(sortType)
    }
  }

  public getPostsByForum(forumUuid: string, sortType: string): Observable<Post[]> {
    if (this.auth.credentials) {
      return this.getPostsByForumAsUser(forumUuid, sortType)
    } else {
      return this.getPostsByForumAsGuest(forumUuid, sortType)
    }
  }

  public getSubscribedPosts(sortType: string) {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = this.baseUrl + '/posts/subscriptions'
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getPostsByForumAsUser(forumUuid: string, sortType: string) {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/forums/${forumUuid}/posts`
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getPostsByForumAsGuest(forumUuid: string, sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders().set('Accept', 'application/json')
    let url = `${this.baseUrl}/forums/${forumUuid}/posts/guest`
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getAllPostsAsUser(sortType: string) {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = this.baseUrl + '/posts'
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getAllPostsAsGuest(sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders().set('Accept', 'application/json')
    let url = this.baseUrl + '/posts/guest'
    return this.http.get<Post[]>(url, { headers, params })
  }

  public getPost(postUuid: string): Observable<Post> {
    if (this.auth.credentials) {
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
    .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/posts/${postUuid}`
    return this.http.get<Post>(url, { headers })
  }

  public voteOnPost(postUuid: string, direction: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = this.baseUrl + '/posts/' + postUuid + '/vote'
    let body = { direction }
    return this.http.post(url, body, { headers })
  }

  public deleteVoteOnPost(postUuid: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.auth.credentials)
    let url = this.baseUrl + '/posts/' + postUuid + '/vote'
    return this.http.delete(url, { headers })
  }

}
