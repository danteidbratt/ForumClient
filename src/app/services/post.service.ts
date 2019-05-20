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

  public submitPost(forumUuid: string, title: string, content: string): Observable<Post> {
    let url = `${this.baseUrl}/forums/${forumUuid}/posts`
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let body = {
      title: title,
      content: content
    }
    return this.http.post<Post>(url, body, { headers })
  }

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

  public getPostsByAuthor(authorUuid: string, sortType: string): Observable<Post[]> {
    if (this.auth.credentials) {
      return this.getPostsByAuthorAsUser(authorUuid, sortType)
    } else {
      return this.getPostsByAuthorAsGuest(authorUuid, sortType)
    }
  }

  public getLikedPosts(likerUuid: string, sortType: string): Observable<Post[]> {
    if (this.auth.credentials) {
      return this.getLikedPostsAsUser(likerUuid, sortType)
    } else {
      return this.getLikedPostsAsGuest(likerUuid, sortType)
    }
  }

  public getLikedPostsAsUser(likerUuid: string, sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/users/${likerUuid}/likes/posts`
    return this.http.get<Post[]>(url, { headers, params })
  }

  public getLikedPostsAsGuest(likerUuid: string, sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/users/${likerUuid}/likes/posts/guest`
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getPostsByAuthorAsUser(authorUuid: string, sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/users/${authorUuid}/posts`
    return this.http.get<Post[]>(url, { headers, params })
  }

  private getPostsByAuthorAsGuest(authorUuid: string, sortType: string): Observable<Post[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/users/${authorUuid}/posts/guest`
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
