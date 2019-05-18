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

  public getCommentsByPost(postUuid: string): Observable<Comment[]> {
    if (this.auth.credentials) {
      return this.getCommentsByPostAsUser(postUuid)
    } else {
      return this.getCommentsByPostAsGuest(postUuid)
    }
  }

  private getCommentsByPostAsUser(postUuid): Observable<Comment[]> {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.auth.credentials)
    let params = new HttpParams()
      .set('sort', 'NEW')
    let url = `${this.baseUrl}/posts/${postUuid}/comments`
    return this.http.get<Comment[]>(url, { headers , params })
  }

  private getCommentsByPostAsGuest(postUuid): Observable<Comment[]> {
    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
    let url = `${this.baseUrl}/posts/${postUuid}/comments/guest`
    return this.http.get<Comment[]>(url, { headers })
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
}
