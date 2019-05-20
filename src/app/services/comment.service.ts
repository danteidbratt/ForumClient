import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AppSettings } from '../misc/constants';
import { Comment } from '../misc/models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  private baseUrl: string = AppSettings.API_BASE_URL

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getCommentsByPost(postUuid: string, sortType: string): Observable<Comment[]> {
    if (this.auth.credentials) {
      return this.getCommentsByPostAsUser(postUuid, sortType)
    } else {
      return this.getCommentsByPostAsGuest(postUuid, sortType)
    }
  }

  public getCommentsByAuthor(authorUuid: string, sortType): Observable<Comment[]> {
    if (this.auth.credentials) {
      return this.getCommentsByAuthorAsUser(authorUuid, sortType)
    } else {
      return this.getCommentsByAuthorAsGuest(authorUuid, sortType)
    }
  }

  public getLikedComments(likerUuid: string, sortType): Observable<Comment[]> {
    if (this.auth.credentials) {
      return this.getLikedCommentsAsUser(likerUuid, sortType)
    } else {
      return this.getLikedCommentsAsGuest(likerUuid, sortType)
    }
  }

  private getLikedCommentsAsUser(authorUuid: string, sortType): Observable<Comment[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/users/${authorUuid}/likes/comments`
    return this.http.get<Comment[]>(url, { headers, params })
  }

  private getLikedCommentsAsGuest(authorUuid: string, sortType): Observable<Comment[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/users/${authorUuid}/likes/comments/guest`
    return this.http.get<Comment[]>(url, { headers, params })
  }

  private getCommentsByAuthorAsUser(authorUuid: string, sortType): Observable<Comment[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/users/${authorUuid}/comments`
    return this.http.get<Comment[]>(url, { headers, params })
  }

  private getCommentsByAuthorAsGuest(authorUuid: string, sortType): Observable<Comment[]> {
    let params = new HttpParams().set('sort', sortType)
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/users/${authorUuid}/posts/guest`
    return this.http.get<Comment[]>(url, { headers, params })
  }

  public createComment(postUuid: string, parentUuid: string, content: string): Observable<Comment> {
    let url = `${this.baseUrl}/posts/${postUuid}/comments`
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let body = {
      parentUuid: parentUuid,
      content: content
    }
    return this.http.post<Comment>(url, body, { headers })
  }

  public voteOnComment(commentUuid: string, direction: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/comments/${commentUuid}/vote`
    let body = { direction }
    return this.http.post(url, body, { headers })
  }

  public deleteVoteOnComment(commentUuid: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', this.auth.credentials)
    let url = `${this.baseUrl}/comments/${commentUuid}/vote`
    return this.http.delete(url, { headers })
  }

  private getCommentsByPostAsUser(postUuid: string, sortType: string): Observable<Comment[]> {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let params = new HttpParams()
      .set('sort', sortType)
    let url = `${this.baseUrl}/posts/${postUuid}/comments`
    return this.http.get<Comment[]>(url, { headers, params })
  }

  private getCommentsByPostAsGuest(postUuid: string, sortType: string): Observable<Comment[]> {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      let params = new HttpParams()
      .set('sort', sortType)
    let url = `${this.baseUrl}/posts/${postUuid}/comments/guest`
    return this.http.get<Comment[]>(url, { headers, params })
  }
}
