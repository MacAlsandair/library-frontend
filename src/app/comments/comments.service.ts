import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsUrl = 'api/comments';  // URL to web api, replace with your real API url

  constructor(private http: HttpClient) { }

  getCommentsByBook(bookId: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/book/${bookId}`;
    return this.http.get<Comment[]>(url);
  }

  getCommentsByAuthor(authorId: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/author/${authorId}`;
    return this.http.get<Comment[]>(url);
  }

  addComment(bookId: number, commentText: string): Observable<Comment> {
    const url = `${this.commentsUrl}/${bookId}`;
    return this.http.post<Comment>(url, commentText);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.put<Comment>(url, comment);
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.delete(url);
  }
}
