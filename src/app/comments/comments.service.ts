import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from './models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsUrl = 'api/comments';  

  constructor(private http: HttpClient) { }

  getComments(bookId: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}?bookId=${bookId}`;
    return this.http.get<Comment[]>(url);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment);
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.put(this.commentsUrl, comment);
  }

  deleteComment(comment: Comment | number): Observable<Comment> {
    const id = typeof comment === 'number' ? comment : comment.id;
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<Comment>(url);
  }
}
